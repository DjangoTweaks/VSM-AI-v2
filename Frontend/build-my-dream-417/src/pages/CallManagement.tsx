import { Phone, PhoneOff, Shield, CheckCircle, Settings, HelpCircle, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

const transcript = [
  { time: "04:28", speaker: "Customer", text: "I'm calling to check my policy status for the auto insurance renewal. I received an email saying there might be a delay.", isCustomer: true },
  { time: "04:30", speaker: "Agent", text: "I can definitely help with that, Ms. Jenkins. I'm opening your file now. Could you please confirm your full name and the last four digits of your Social Security number for verification?", isCustomer: false },
  { time: "04:31", speaker: "Customer", text: "Yes, it's Sarah Jenkins and the digits are 4-4-9-2.", isCustomer: true },
  { time: "04:32", speaker: "Agent", text: "(Processing verification data...)", isCustomer: false, isProcessing: true },
];

const CallManagement = () => (
  <div>
    {/* Top Nav */}
    <div className="vsm-card p-4 flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
          <Phone className="w-6 h-6 text-success" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Live Call: <span className="text-primary">#8821-90</span></h1>
          <p className="text-sm text-muted-foreground">Duration: 04:32 • Caller: Sarah Jenkins</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary/90">
          <Shield className="w-4 h-4" /> Verify Identity
        </button>
        <button className="bg-destructive text-destructive-foreground px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-destructive/90">
          <PhoneOff className="w-4 h-4" /> End Call
        </button>
      </div>
    </div>

    <div className="grid grid-cols-5 gap-6">
      {/* Transcript */}
      <div className="col-span-3">
        <div className="vsm-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Live Transcript
            </h3>
            <span className="bg-success/10 text-success text-xs font-semibold px-2.5 py-1 rounded-full">LIVE</span>
          </div>

          <div className="space-y-5 mb-6">
            {transcript.map((t, i) => (
              <div key={i}>
                <p className="text-xs text-muted-foreground mb-1">
                  [{t.time}] <span className={`font-semibold ${t.isCustomer ? "text-primary" : "text-foreground"}`}>{t.speaker}:</span>
                </p>
                <div className={`rounded-lg p-3 text-sm ${
                  t.isProcessing
                    ? "border-l-4 border-primary bg-primary/5 italic text-muted-foreground"
                    : t.isCustomer
                      ? "bg-muted/50 text-foreground"
                      : "bg-card text-foreground"
                }`}>
                  {t.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="relative">
            <Textarea placeholder="Type a message or internal note..." className="min-h-[80px] pr-12 resize-none" />
            <button className="absolute bottom-3 right-3 text-primary hover:text-primary/80">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="col-span-2 space-y-4">
        {/* Voice Verification */}
        <div className="vsm-card p-5">
          <h4 className="font-bold text-foreground flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4" /> Voice Verification
          </h4>
          <div className="bg-success/5 border border-success/20 rounded-lg p-4 flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] font-semibold text-success uppercase tracking-wider">Status: Secure</p>
              <p className="text-lg font-bold text-foreground">Match Confirmed</p>
            </div>
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Risk Score</span>
            <span className="text-sm font-bold text-success">Low (8%)</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-4">
            <div className="bg-success h-2 rounded-full" style={{ width: "8%" }} />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Stress Level</p>
              <p className="font-bold text-sm text-foreground">Normal</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Background Noise</p>
              <p className="font-bold text-sm text-foreground">Minimal</p>
            </div>
          </div>
          <button className="w-full border border-border rounded-lg py-2 text-sm font-medium text-primary hover:bg-primary/5">
            View Spectral Analysis
          </button>
        </div>

        {/* Customer Profile */}
        <div className="vsm-card p-5">
          <h4 className="font-bold text-foreground flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4" /> Customer Profile
          </h4>
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-muted text-muted-foreground font-semibold">SJ</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground text-sm">Sarah Jenkins</p>
              <p className="text-xs text-muted-foreground">Member since Feb 2019</p>
            </div>
          </div>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Policy Number</span><span className="font-semibold text-foreground">#POL-772910</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Plan Type</span><span className="font-semibold text-foreground">Premium Auto+</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Last Interaction</span><span className="font-semibold text-foreground">2 days ago</span></div>
          </div>
        </div>

        {/* Call Notes */}
        <div className="vsm-card p-5">
          <h4 className="font-bold text-foreground flex items-center gap-2 mb-3">
            <MessageSquare className="w-4 h-4" /> Call Notes
          </h4>
          <Textarea placeholder="Add observations or follow-up tasks..." className="min-h-[100px] resize-none" />
        </div>
      </div>
    </div>

    {/* Status Bar */}
    <div className="fixed bottom-0 left-56 right-0 bg-card border-t border-border px-6 py-2 flex items-center justify-between text-xs text-muted-foreground">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-success" /> SYSTEM ONLINE</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" /> API CONNECTED</span>
      </div>
      <div className="flex items-center gap-4">
        <span>VSM AGENT V4.2.1</span>
        <span>SERVER: US-EAST-1</span>
      </div>
    </div>
  </div>
);

export default CallManagement;
