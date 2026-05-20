-- ============================================================
-- VSM Database Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Users profile table (linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Manager', 'Agent')),
  status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Customers
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  date_of_birth DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Policies
CREATE TABLE IF NOT EXISTS public.policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_number TEXT UNIQUE NOT NULL,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('Term Life', 'Whole Life', 'Universal Life', 'Health', 'Auto', 'Home')),
  agent_name TEXT,
  enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Voice biometric profiles
CREATE TABLE IF NOT EXISTS public.voice_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  policy_id UUID REFERENCES public.policies(id) ON DELETE SET NULL,
  file_url TEXT,
  file_name TEXT,
  file_size INTEGER,
  consent_given BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Calls
CREATE TABLE IF NOT EXISTS public.calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  agent_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  duration TEXT,
  start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  end_time TIMESTAMPTZ,
  is_live BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Completed', 'Flagged')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Call transcripts
CREATE TABLE IF NOT EXISTS public.call_transcripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id UUID NOT NULL REFERENCES public.calls(id) ON DELETE CASCADE,
  timestamp TEXT,
  speaker TEXT CHECK (speaker IN ('Agent', 'Customer')),
  text TEXT NOT NULL,
  is_processing BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Voice verification results (per call biometric check)
CREATE TABLE IF NOT EXISTS public.voice_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id UUID NOT NULL REFERENCES public.calls(id) ON DELETE CASCADE,
  voice_embedding_id UUID REFERENCES public.voice_embeddings(id) ON DELETE SET NULL,
  match_score NUMERIC(5,2),
  risk_score NUMERIC(5,2),
  status TEXT CHECK (status IN ('Match Confirmed', 'Mismatch', 'No Match')),
  stress_level TEXT CHECK (stress_level IN ('Normal', 'High', 'Low')),
  background_noise TEXT CHECK (background_noise IN ('Minimal', 'Moderate', 'High')),
  emotional_state TEXT,
  verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Flagged calls / review queue
CREATE TABLE IF NOT EXISTS public.flagged_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id UUID NOT NULL REFERENCES public.calls(id) ON DELETE CASCADE,
  risk_level TEXT CHECK (risk_level IN ('HIGH RISK', 'MEDIUM RISK', 'LOW RISK')),
  risk_score NUMERIC(5,2),
  ai_flag TEXT,
  fraud_indicators JSONB,
  status TEXT NOT NULL DEFAULT 'Pending Review' CHECK (status IN ('Pending Review', 'Approved', 'Rejected', 'Escalated')),
  reviewed_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  decision TEXT CHECK (decision IN ('Approve', 'Reject (Fraud)', 'Escalate')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Internal call notes
CREATE TABLE IF NOT EXISTS public.call_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id UUID NOT NULL REFERENCES public.calls(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_policies_customer_id ON public.policies(customer_id);
CREATE INDEX IF NOT EXISTS idx_voice_embeddings_customer_id ON public.voice_embeddings(customer_id);
CREATE INDEX IF NOT EXISTS idx_calls_status ON public.calls(status);
CREATE INDEX IF NOT EXISTS idx_calls_agent_id ON public.calls(agent_id);
CREATE INDEX IF NOT EXISTS idx_calls_customer_id ON public.calls(customer_id);
CREATE INDEX IF NOT EXISTS idx_call_transcripts_call_id ON public.call_transcripts(call_id);
CREATE INDEX IF NOT EXISTS idx_voice_verifications_call_id ON public.voice_verifications(call_id);
CREATE INDEX IF NOT EXISTS idx_flagged_calls_status ON public.flagged_calls(status);
CREATE INDEX IF NOT EXISTS idx_call_notes_call_id ON public.call_notes(call_id);

-- ============================================================
-- Storage bucket for voice files
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('voice-files', 'voice-files', true)
ON CONFLICT (id) DO NOTHING;
