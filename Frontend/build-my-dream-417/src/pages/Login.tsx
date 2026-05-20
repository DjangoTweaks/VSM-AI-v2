import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn, Lock, Shield } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-foreground mb-4">
              <span className="text-primary-foreground font-bold text-sm tracking-tight">VSM.ai</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">VSM.ai</h1>
            <p className="text-muted-foreground text-sm mt-1">Enterprise Security Portal</p>
          </div>

          {/* Login Card */}
          <div className="vsm-card p-8">
            <h2 className="text-2xl font-bold text-foreground mb-1">Welcome back</h2>
            <p className="text-muted-foreground text-sm mb-6">Log in to your secure VSM.ai account</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <a href="#" className="text-sm text-primary hover:underline font-medium">Forgot password?</a>
              </div>

              <Button type="submit" className="w-full h-11 text-base font-semibold gap-2">
                Sign In <LogIn className="w-4 h-4" />
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-border text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs tracking-widest uppercase">
                <Lock className="w-3 h-3" />
                Encrypted 256-bit connection
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account? <a href="#" className="text-primary hover:underline font-medium">Contact your administrator</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-border">
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">Privacy Policy</a>
          <a href="#" className="hover:text-foreground">Terms of Service</a>
          <a href="#" className="hover:text-foreground">Support</a>
        </div>
        <p className="text-xs text-muted-foreground mt-2">© 2024 VSM.ai Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
