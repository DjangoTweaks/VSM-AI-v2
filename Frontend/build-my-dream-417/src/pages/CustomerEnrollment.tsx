import { useState } from "react";
import { Search, Upload, Mic, CheckCircle, AlertTriangle, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const tabs = ["Personal Info", "Policy Details", "Voice Consent"];

const CustomerEnrollment = () => {
  const [activeTab, setActiveTab] = useState("Voice Consent");

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customer Enrollment</h1>
          <p className="text-sm text-muted-foreground">Register or manage customer voice biometric profiles for secure authentication.</p>
        </div>
        <span className="vsm-badge-medium-risk flex items-center gap-1.5">
          <AlertTriangle className="w-3 h-3" /> Missing Consent
        </span>
      </div>

      {/* Search */}
      <div className="vsm-card p-4 flex items-center gap-3 mb-6">
        <Search className="w-5 h-5 text-muted-foreground" />
        <Input placeholder="Search existing customer by phone, name, or policy number" className="border-0 shadow-none flex-1" />
        <Button className="px-6">Search</Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-6">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-5 py-3 text-sm font-medium rounded-t-lg border border-border transition-colors flex items-center gap-2 ${
              activeTab === t ? "bg-card border-b-card text-primary" : "bg-muted/50 text-muted-foreground border-b-border"
            }`}
          >
            {t === "Personal Info" && <User className="w-4 h-4" />}
            {t === "Policy Details" && "📄"}
            {t === "Voice Consent" && <Mic className="w-4 h-4" />}
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Main Content */}
        <div className="col-span-3">
          <div className="vsm-card p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Upload className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Voice Consent Upload</h3>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-border rounded-xl p-10 text-center mb-6 hover:border-primary/40 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎵</span>
              </div>
              <p className="font-semibold text-foreground mb-1">Drop audio file here</p>
              <p className="text-sm text-muted-foreground mb-4">Supported formats: WAV, MP3, M4A (Max 10MB)</p>
              <Button variant="outline">Browse Files</Button>
            </div>

            {/* OR Record */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 border-t border-border" />
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Or Record Live</span>
              <div className="flex-1 border-t border-border" />
            </div>

            <div className="text-center">
              <button className="w-16 h-16 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center mx-auto hover:bg-destructive/90 transition-colors shadow-lg">
                <Mic className="w-7 h-7" />
              </button>
              <p className="font-semibold text-foreground mt-3">Record Consent</p>
              <p className="text-sm text-muted-foreground">Click to start recording voice sample</p>
            </div>
          </div>

          {/* Requirements */}
          <div className="vsm-card p-5 mt-4">
            <h4 className="text-sm font-semibold text-primary flex items-center gap-2 mb-3">
              ℹ️ Enrollment Requirements
            </h4>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" /> Customer must clearly state: "I consent to my voice being used for biometric authentication."</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" /> Minimum recording length: 5 seconds.</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" /> Ensure background noise is minimized for higher quality embedding.</li>
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-2 space-y-4">
          {/* Enrollment Status */}
          <div className="vsm-card p-5">
            <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">Enrollment Status</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">Personal Info</span>
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">Policy Match</span>
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">Voice Capture</span>
                <span className="text-xs font-semibold text-primary">IN PROGRESS</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">Embedding</span>
                <span className="text-muted-foreground">•••</span>
              </div>
            </div>
            <Progress value={65} className="mt-4 h-2" />
            <p className="text-xs text-muted-foreground text-right mt-1">65% COMPLETE</p>
          </div>

          {/* Customer Details */}
          <div className="vsm-card p-5">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Customer Details</h4>
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground text-sm">Jane Doe</p>
                <p className="text-xs text-muted-foreground">Member since 2023</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Phone:</span><span className="font-medium text-foreground">+1 (555) 123-4567</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Policy:</span><span className="font-medium text-foreground">#POL-988231-X</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Plan:</span><span className="font-medium text-foreground">Premium Life Plus</span></div>
            </div>
          </div>

          {/* Complete Button */}
          <Button className="w-full h-12 text-base font-semibold">
            Complete Enrollment →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerEnrollment;
