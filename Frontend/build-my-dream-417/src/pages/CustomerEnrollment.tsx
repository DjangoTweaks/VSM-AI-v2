import { useState, useRef } from "react";
import { Upload, Mic, CheckCircle, User, FileAudio, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

const tabs = ["Personal Info", "Policy Details", "Voice Consent"];

const PLAN_TYPES = ["Term Life", "Whole Life", "Universal Life", "Health", "Auto", "Home"];

interface PersonalInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: string;
}

interface PolicyDetails {
  policyNumber: string;
  planType: string;
  agentName: string;
  enrollmentDate: string;
}

const CustomerEnrollment = () => {
  const [activeTab, setActiveTab] = useState("Personal Info");
  const [completedTabs, setCompletedTabs] = useState<Set<string>>(new Set());

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dob: "",
  });

  const [policyDetails, setPolicyDetails] = useState<PolicyDetails>({
    policyNumber: "",
    planType: "",
    agentName: "",
    enrollmentDate: new Date().toISOString().split("T")[0],
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [enrolledCustomer, setEnrolledCustomer] = useState<{ name: string; id: string; qdrantId?: string } | null>(null);

  const handleCompleteEnrollment = async () => {
    if (!uploadedFile) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const customer = await api.post<{ id: string }>('/customers', {
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        phone: personalInfo.phone,
        email: personalInfo.email,
        ...(personalInfo.dob && { dateOfBirth: personalInfo.dob }),
      });
      const policy = await api.post<{ id: string }>('/policies', {
        policyNumber: policyDetails.policyNumber,
        customerId: customer.id,
        planType: policyDetails.planType,
        ...(policyDetails.agentName && { agentName: policyDetails.agentName }),
        enrollmentDate: policyDetails.enrollmentDate,
      });
      const form = new FormData();
      form.append('file', uploadedFile);
      form.append('customerId', customer.id);
      form.append('policyId', policy.id);
      form.append('consentGiven', 'true');
      const voiceResult = await api.postForm<{ qdrant_id?: string }>('/voice-embeddings/insert', form);
      setEnrolledCustomer({
        name: `${personalInfo.firstName} ${personalInfo.lastName}`,
        id: customer.id,
        qdrantId: voiceResult?.qdrant_id,
      });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Enrollment failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setPersonalInfo({ firstName: '', lastName: '', phone: '', email: '', dob: '' });
    setPolicyDetails({ policyNumber: '', planType: '', agentName: '', enrollmentDate: new Date().toISOString().split('T')[0] });
    setUploadedFile(null);
    setCompletedTabs(new Set());
    setActiveTab('Personal Info');
    setEnrolledCustomer(null);
    setSubmitError(null);
  };

  const markComplete = (tab: string) =>
    setCompletedTabs((prev) => new Set(prev).add(tab));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setUploadedFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f && f.name.endsWith(".wav")) setUploadedFile(f);
  };

  // Sidebar computed state
  const personalInfoDone = completedTabs.has("Personal Info");
  const policyDetailsDone = completedTabs.has("Policy Details");
  const voiceCaptureDone = !!uploadedFile;
  const progressPct = Math.round(
    ([personalInfoDone, policyDetailsDone, voiceCaptureDone, false].filter(Boolean).length / 4) * 100
  );

  const customerInitials = personalInfoDone
    ? `${personalInfo.firstName[0] ?? ""}${personalInfo.lastName[0] ?? ""}`.toUpperCase()
    : "?";
  const customerName = personalInfoDone
    ? `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || "—"
    : "—";

  if (enrolledCustomer) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Customer Enrollment</h1>
            <p className="text-sm text-muted-foreground">
              Register or manage customer voice biometric profiles for secure authentication.
            </p>
          </div>
        </div>
        <div className="vsm-card p-10 text-center max-w-md mx-auto mt-10">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Enrollment Complete!</h2>
          <p className="text-muted-foreground mb-1">
            <span className="font-semibold text-foreground">{enrolledCustomer.name}</span> has been successfully enrolled.
          </p>
          <p className="text-xs text-muted-foreground mb-4">Voice biometric profile saved to database.</p>

          {enrolledCustomer.qdrantId && (
            <div className="bg-muted/60 rounded-lg px-4 py-3 mb-6 text-left">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Qdrant Embedding ID
              </p>
              <p className="font-mono text-sm text-foreground break-all">{enrolledCustomer.qdrantId}</p>
            </div>
          )}

          <Button onClick={handleReset} className="w-full">Enroll Another Customer</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customer Enrollment</h1>
          <p className="text-sm text-muted-foreground">
            Register or manage customer voice biometric profiles for secure authentication.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-6">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-5 py-3 text-sm font-medium rounded-t-lg border border-border transition-colors flex items-center gap-2 ${
              activeTab === t
                ? "bg-card border-b-card text-primary"
                : "bg-muted/50 text-muted-foreground border-b-border"
            }`}
          >
            {completedTabs.has(t) ? (
              <CheckCircle className="w-4 h-4 text-success" />
            ) : (
              <>
                {t === "Personal Info" && <User className="w-4 h-4" />}
                {t === "Policy Details" && <span>📄</span>}
                {t === "Voice Consent" && <Mic className="w-4 h-4" />}
              </>
            )}
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Main Content */}
        <div className="col-span-3">

          {/* ── Personal Info ── */}
          {activeTab === "Personal Info" && (
            <div className="vsm-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Personal Information</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>First Name</Label>
                  <Input
                    placeholder="Jane"
                    value={personalInfo.firstName}
                    onChange={(e) => setPersonalInfo((p) => ({ ...p, firstName: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Last Name</Label>
                  <Input
                    placeholder="Doe"
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo((p) => ({ ...p, lastName: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone Number</Label>
                  <Input
                    placeholder="+1 (555) 123-4567"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo((p) => ({ ...p, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    placeholder="jane.doe@email.com"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo((p) => ({ ...p, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5 col-span-2">
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={personalInfo.dob}
                    onChange={(e) => setPersonalInfo((p) => ({ ...p, dob: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  disabled={!personalInfo.firstName || !personalInfo.lastName || !personalInfo.phone}
                  onClick={() => { markComplete("Personal Info"); setActiveTab("Policy Details"); }}
                >
                  Next: Policy Details →
                </Button>
              </div>
            </div>
          )}

          {/* ── Policy Details ── */}
          {activeTab === "Policy Details" && (
            <div className="vsm-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-lg">📄</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">Policy Details</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Policy Number</Label>
                  <Input
                    placeholder="POL-XXXXXX-X"
                    value={policyDetails.policyNumber}
                    onChange={(e) => setPolicyDetails((p) => ({ ...p, policyNumber: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Plan Type</Label>
                  <select
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={policyDetails.planType}
                    onChange={(e) => setPolicyDetails((p) => ({ ...p, planType: e.target.value }))}
                  >
                    <option value="">Select plan...</option>
                    {PLAN_TYPES.map((pt) => (
                      <option key={pt} value={pt}>{pt}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label>Agent Name</Label>
                  <Input
                    placeholder="Agent handling enrollment"
                    value={policyDetails.agentName}
                    onChange={(e) => setPolicyDetails((p) => ({ ...p, agentName: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Enrollment Date</Label>
                  <Input
                    type="date"
                    value={policyDetails.enrollmentDate}
                    onChange={(e) => setPolicyDetails((p) => ({ ...p, enrollmentDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setActiveTab("Personal Info")}>
                  ← Back
                </Button>
                <Button
                  disabled={!policyDetails.policyNumber || !policyDetails.planType}
                  onClick={() => { markComplete("Policy Details"); setActiveTab("Voice Consent"); }}
                >
                  Next: Voice Consent →
                </Button>
              </div>
            </div>
          )}

          {/* ── Voice Consent ── */}
          {activeTab === "Voice Consent" && (
            <>
              <div className="vsm-card p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Upload className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Voice Consent Upload</h3>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".wav"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
                    uploadedFile
                      ? "border-success bg-success/5"
                      : isDragOver
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    {uploadedFile
                      ? <FileAudio className="w-7 h-7 text-success" />
                      : <span className="text-3xl">🎵</span>
                    }
                  </div>
                  {uploadedFile ? (
                    <>
                      <p className="font-semibold text-success mb-1">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024).toFixed(1)} KB · Click to replace
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-foreground mb-1">Drop .wav file here</p>
                      <p className="text-sm text-muted-foreground mb-4">WAV format only · 10–12 seconds</p>
                      <Button
                        variant="outline"
                        onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                      >
                        Browse Files
                      </Button>
                    </>
                  )}
                </div>

                {submitError && (
                  <p className="text-sm text-destructive mt-4 text-center">{submitError}</p>
                )}

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setActiveTab("Policy Details")} disabled={isSubmitting}>
                    ← Back
                  </Button>
                  <Button
                    disabled={!uploadedFile || isSubmitting}
                    onClick={handleCompleteEnrollment}
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Enrolling…</>
                    ) : (
                      "Complete Enrollment →"
                    )}
                  </Button>
                </div>
              </div>

              {/* Requirements */}
              <div className="vsm-card p-5 mt-4">
                <h4 className="text-sm font-semibold text-primary flex items-center gap-2 mb-3">
                  ℹ️ Enrollment Requirements
                </h4>
                <ul className="space-y-2 text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                    Customer must clearly state: "I consent to my voice being used for biometric authentication."
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                    File must be a .wav file, approximately 10–12 seconds long.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                    Ensure background noise is minimized for higher quality embedding.
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-2 space-y-4">
          {/* Enrollment Status */}
          <div className="vsm-card p-5">
            <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
              Enrollment Status
            </h4>
            <div className="space-y-3">
              {[
                { label: "Personal Info", done: personalInfoDone, active: activeTab === "Personal Info" },
                { label: "Policy Match", done: policyDetailsDone, active: activeTab === "Policy Details" },
                { label: "Voice Capture", done: voiceCaptureDone, active: activeTab === "Voice Consent" },
                { label: "Embedding", done: false, active: false },
              ].map(({ label, done, active }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{label}</span>
                  {done ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : active ? (
                    <span className="text-xs font-semibold text-primary">IN PROGRESS</span>
                  ) : (
                    <span className="text-muted-foreground">•••</span>
                  )}
                </div>
              ))}
            </div>
            <Progress value={progressPct} className="mt-4 h-2" />
            <p className="text-xs text-muted-foreground text-right mt-1">{progressPct}% COMPLETE</p>
          </div>

          {/* Customer Details */}
          <div className="vsm-card p-5">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Customer Details
            </h4>
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {customerInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground text-sm">{customerName}</p>
                <p className="text-xs text-muted-foreground">
                  {personalInfoDone ? "Enrollment in progress" : "Not yet entered"}
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium text-foreground">{personalInfo.phone || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Policy:</span>
                <span className="font-medium text-foreground">
                  {policyDetails.policyNumber ? `#${policyDetails.policyNumber}` : "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan:</span>
                <span className="font-medium text-foreground">{policyDetails.planType || "—"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerEnrollment;
