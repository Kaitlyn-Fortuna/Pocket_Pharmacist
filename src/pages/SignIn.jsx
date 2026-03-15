import React, { useEffect, useState } from "react";
import { Zap, ShieldCheck, ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// ------------------------------------------------------------------
// Cognito integration – swap these with your real User Pool values
// ------------------------------------------------------------------
const COGNITO_CONFIG = {
  cognitoDomain: "pocket-pharmacist.auth.us-east-1.amazoncognito.com", // no https://, no trailing slash
  clientId: "35n5mj2g6io1gqj9pplcaekc6s",
  redirectUri: window.location.origin + "/Capture",
  scope: "openid email profile",
};

function buildCognitoUrl(type) {
   const base = 'https://${COGNITO_CONFIG.cognitoDomain}/${type}'; // fixed: cognitoDomain
  const params = new URLSearchParams({
    client_id: COGNITO_CONFIG.clientId,
    response_type: "code",
    scope: COGNITO_CONFIG.scope,
    redirect_uri: COGNITO_CONFIG.redirectUri,
  });
  return '${base}?${params.toString()}';
}

// ------------------------------------------------------------------
// After Cognito redirects back with ?code=..., exchange it for tokens:
// POST /auth/token  →  { code, redirect_uri }  →  { id_token, ... }
// Then: localStorage.setItem('id_token', tokens.id_token)
// Attach to every request: Authorization: Bearer <id_token>
// ------------------------------------------------------------------

const features = [
  { icon: "📷", text: "Scan any pill bottle instantly" },
  { icon: "⚠️", text: "Real-time interaction warnings" },
  { icon: "💊", text: "Track all your medications" },
];

export default function SignIn() {
  const [showManual, setShowManual] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [logoSrc, setLogoSrc] = useState("/Pocket Pharmacist.gif");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLogoSrc("/Pocket Pharmacist.png");
    }, 1800); // adjust to match the length of your GIF animation

    return () => clearTimeout(timeout);
  }, []);

  const handleCognitoLogin = () => {
    window.location.href = buildCognitoUrl("login");
  };

  const handleCognitoSignup = () => {
    window.location.href = buildCognitoUrl("signup");
  };

  const handleManualLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: POST /auth/login → exchange credentials for Cognito JWT
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Hero gradient */}
      <div className="relative bg-gradient-to-br from-primary/90 to-primary pt-16 pb-12 px-6 text-primary-foreground overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/5" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-center"
        >
          <div className="h-16 w-24 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
            <img
              src={logoSrc}
              alt="Pocket Pharmacist"
              className="w-24 h-24 rounded-full"
            />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight mb-1">Pocket Pharmacist</h1>
          <p className="text-primary-foreground/80 text-sm">
            AI-powered medication safety at your fingertips
          </p>
        </motion.div>
      </div>

      {/* Feature list */}
      <div className="px-6 mt-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl border border-border shadow-sm p-4 space-y-2.5"
        >
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xl">{f.icon}</span>
              <p className="text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Auth section */}
      <div className="px-6 flex-1 space-y-3">
        {!showManual ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <Button
              onClick={handleCognitoLogin}
              size="lg"
              className="w-full h-14 rounded-2xl text-base font-semibold gap-2 bg-primary hover:bg-primary/90"
            >
              <ShieldCheck className="w-5 h-5" />
              Sign in with Cognito
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Button>

            <Button
              onClick={handleCognitoSignup}
              variant="outline"
              size="lg"
              className="w-full h-14 rounded-2xl text-base font-semibold"
            >
              Create an account
            </Button>

            <div className="relative flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <button
              onClick={() => setShowManual(true)}
              className="w-full text-sm text-muted-foreground hover:text-foreground text-center transition-colors py-1"
            >
              Sign in with email &amp; password
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleManualLogin}
            className="space-y-3"
          >
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 rounded-xl border border-input bg-card text-sm pl-10 pr-4 outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-12 rounded-xl border border-input bg-card text-sm pl-10 pr-11 outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full h-12 rounded-xl text-sm font-semibold bg-primary hover:bg-primary/90"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <button
              type="button"
              onClick={() => setShowManual(false)}
              className="w-full text-sm text-muted-foreground hover:text-foreground text-center transition-colors"
            >
              ← Back
            </button>
          </motion.form>
        )}

        <p className="text-center text-xs text-muted-foreground pb-8 pt-2">
          Protected by AWS Cognito · Your data is encrypted at rest
        </p>
      </div>
    </div>
  );
}