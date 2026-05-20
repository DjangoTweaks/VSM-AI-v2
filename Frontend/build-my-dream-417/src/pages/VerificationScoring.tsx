import { Shield, BarChart3 } from "lucide-react";

const flaggedCalls = [
  { name: "John Doe", initials: "JD", id: "#8821-X9", risk: "HIGH RISK", score: 92, time: "2m 45s ago", color: "bg-primary/10 text-primary", riskClass: "vsm-badge-high-risk", border: "border-destructive/30" },
  { name: "Alice Smith", initials: "AS", id: "#7712-Q2", risk: "MEDIUM RISK", score: 64, time: "12m ago", color: "bg-warning/10 text-warning", riskClass: "vsm-badge-medium-risk", border: "border-warning/30" },
  { name: "Robert Jones", initials: "RJ", id: "#4491-K1", risk: "HIGH RISK", score: 88, time: "45m ago", color: "bg-destructive/10 text-destructive", riskClass: "vsm-badge-high-risk", border: "border-destructive/30" },
];

const VerificationScoring = () => (
  <div>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-foreground">Verification & Scoring</h1>
      <p className="text-sm text-muted-foreground">Review flagged calls and manage verification decisions.</p>
    </div>

    <div className="grid grid-cols-2 gap-6">
      {/* Flagged Queue */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Shield className="w-5 h-5" /> Flagged Calls
          </h2>
          <span className="vsm-badge-high-risk text-[10px]">REQUIRES ACTION</span>
        </div>
        <div className="space-y-3">
          {flaggedCalls.map((c) => (
            <div key={c.id} className={`vsm-card p-4 border-l-4 ${c.border} cursor-pointer hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${c.color}`}>
                    {c.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Caller: {c.name}</p>
                    <p className="text-xs text-muted-foreground">ID: {c.id}</p>
                  </div>
                </div>
                <span className={c.riskClass}>{c.risk}</span>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <span>Score: <span className="text-destructive font-semibold">{c.score}/100</span></span>
                <span>Time: {c.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Panel */}
      <div className="space-y-4">
        <div className="vsm-card p-6">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-bold text-foreground">REVIEWING: CASE #8821-X9</h3>
            <span className="vsm-badge-high-risk text-[10px]">CRITICAL</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Session started: Oct 24, 2023 - 14:22:10</p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Voice Match</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div className="bg-destructive h-2 rounded-full" style={{ width: "14%" }} />
                </div>
                <span className="text-sm font-bold text-destructive">14%</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Emotion</p>
              <p className="text-sm font-bold text-foreground">High Agitation</p>
            </div>
          </div>

          {/* Transcript */}
          <div className="bg-muted/50 rounded-lg p-4 mb-4">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-3">Transcript Segment: 02:15 - 02:45</p>
            <div className="space-y-3 text-sm">
              <p><span className="font-semibold text-primary">AGENT:</span> I understand the frustration, sir. To proceed with the $5,000 wire transfer, I just need you to confirm your mother's maiden name one more time.</p>
              <div className="bg-destructive/5 border border-destructive/20 rounded p-2">
                <p><span className="font-semibold text-destructive">CALLER:</span> Listen, I've already told you, it's Williams. Look, my phone is dying and this is urgent. Just push the transfer through now or I'm closing my account!</p>
              </div>
              <p><span className="font-semibold text-primary">AGENT:</span> Thank you. System is running the voice biometric check now. It should only take a few more seconds.</p>
            </div>
          </div>

          {/* AI Flag */}
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 mb-5">
            <p className="text-sm"><span className="font-semibold text-destructive">AI FLAG:</span> <em className="text-destructive/80">Alert: Voice profile mismatch (Similarity: 14.2%). Behavioral patterns indicate high-pressure social engineering tactics.</em></p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex-1 bg-success text-success-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-success/90">✓ Approve</button>
            <button className="flex-1 bg-destructive text-destructive-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-destructive/90">✕ Reject (Fraud)</button>
            <button className="flex-1 vsm-card font-semibold py-3 flex items-center justify-center gap-2 hover:bg-accent">! Escalate</button>
          </div>
        </div>

        {/* Biometric Visualization */}
        <div className="vsm-card p-5">
          <h4 className="font-bold text-foreground flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4" /> Biometric Analysis Visualization
          </h4>
          <div className="bg-muted/30 rounded-lg p-4 h-32 flex items-end gap-1">
            {Array.from({ length: 30 }).map((_, i) => {
              const isStress = [8, 9, 10, 14, 15, 25, 26].includes(i);
              const height = isStress ? 60 + Math.random() * 40 : 20 + Math.random() * 40;
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-t ${isStress ? "bg-destructive/70" : "bg-primary/30"}`}
                  style={{ height: `${height}%` }}
                />
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-destructive" /> High Stress detected</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary/30" /> Baseline voice</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default VerificationScoring;
