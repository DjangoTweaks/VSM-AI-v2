import { Phone, Flag, ClipboardCheck, TrendingUp, TrendingDown } from "lucide-react";

const stats = [
  { label: "Total Calls", value: "12,482", change: "+12%", up: true, icon: Phone, color: "bg-primary/10 text-primary" },
  { label: "Flagged Calls", value: "156", change: "+5%", up: true, icon: Flag, color: "bg-warning/10 text-warning" },
  { label: "Reviews Pending", value: "42", change: "-8%", up: false, icon: ClipboardCheck, color: "bg-destructive/10 text-destructive" },
];

const flaggedCalls = [
  { name: "John Doe", initials: "JD", id: "#8821-X9", risk: "HIGH RISK", score: 92, time: "2m 45s ago", color: "bg-primary/10 text-primary", border: "border-destructive/30" },
  { name: "Alice Smith", initials: "AS", id: "#7712-Q2", risk: "MEDIUM RISK", score: 64, time: "12m ago", color: "bg-warning/10 text-warning", border: "border-warning/30" },
  { name: "Robert Jones", initials: "RJ", id: "#4491-K1", risk: "HIGH RISK", score: 88, time: "45m ago", color: "bg-destructive/10 text-destructive", border: "border-destructive/30" },
];

const Dashboard = () => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manager Dashboard</h1>
        <p className="text-sm text-muted-foreground">Real-time verification oversight and fraud prevention metrics.</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="vsm-card px-4 py-2 text-sm font-medium flex items-center gap-2 hover:bg-accent">
          📅 Today
        </button>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-primary/90">
          ⬇ Export Report
        </button>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-4 mb-8">
      {stats.map((s) => (
        <div key={s.label} className="vsm-card p-5">
          <div className="flex items-start justify-between">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <span className={`text-xs font-semibold flex items-center gap-0.5 ${s.up ? "text-success" : "text-destructive"}`}>
              {s.change} {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-3">{s.label}</p>
          <p className="text-3xl font-bold text-foreground">{s.value}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-2 gap-6">
      {/* Flagged Calls */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-bold text-foreground">Flagged Calls</h2>
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
                <span className={c.score >= 80 ? "vsm-badge-high-risk" : "vsm-badge-medium-risk"}>
                  {c.risk}
                </span>
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
      <div>
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
      </div>
    </div>
  </div>
);

export default Dashboard;
