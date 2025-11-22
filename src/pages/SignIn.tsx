import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

// Validation Schema
const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be less than 128 characters"),
  remember: z.boolean().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMFA, setShowMFA] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [attemptCount, setAttemptCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      remember: false,
    },
  });

  const rememberMe = watch("remember");

  // Analytics event helper
  const trackEvent = (eventName: string, params?: Record<string, any>) => {
    // GA4 dataLayer push
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: eventName,
        ...params,
      });
    }
    // Meta Pixel
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", eventName, params);
    }
  };

  // Track page view
  useState(() => {
    trackEvent("auth_view", { page: "signin" });
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    trackEvent("auth_submit", { method: "password" });

    try {
      // TODO: Replace with actual Supabase Auth when Cloud is enabled
      // const { data: authData, error } = await supabase.auth.signInWithPassword({
      //   email: data.email,
      //   password: data.password,
      // });

      // Simulated API call for now
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          remember: data.remember,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setAttemptCount((prev) => prev + 1);

        if (result.error === "email_not_verified") {
          toast({
            variant: "destructive",
            title: "Email not verified",
            description: (
              <div>
                Please verify your email address.{" "}
                <button
                  onClick={handleResendVerification}
                  className="underline font-medium"
                >
                  Resend verification
                </button>
              </div>
            ),
          });
          trackEvent("auth_failure", { reason: "email_not_verified" });
          return;
        }

        if (result.error === "account_suspended") {
          toast({
            variant: "destructive",
            title: "Account suspended",
            description:
              "Your account has been suspended. Please contact support.",
          });
          trackEvent("auth_failure", { reason: "account_suspended" });
          return;
        }

        throw new Error(result.message || "Invalid credentials");
      }

      // Check for MFA requirement
      if (result.mfa_required) {
        setShowMFA(true);
        trackEvent("auth_mfa_shown");
        return;
      }

      // Success
      toast({
        title: "Welcome back!",
        description: "Signing you in...",
      });
      trackEvent("auth_success", { method: "password" });

      // Store session (in real implementation, handled by Supabase)
      if (data.remember) {
        localStorage.setItem("remember_me", "true");
      }

      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error: any) {
      setAttemptCount((prev) => prev + 1);
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.message || "Invalid email or password",
      });
      trackEvent("auth_failure", { method: "password", reason: "invalid_credentials" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "linkedin") => {
    trackEvent("auth_submit", { method: provider });
    setIsLoading(true);

    try {
      // TODO: Replace with actual Supabase OAuth when Cloud is enabled
      // const { data, error } = await supabase.auth.signInWithOAuth({
      //   provider: provider === 'linkedin' ? 'linkedin_oidc' : provider,
      //   options: {
      //     redirectTo: `${window.location.origin}/dashboard`,
      //   },
      // });

      // Simulated OAuth flow
      window.location.href = `/api/auth/oauth/${provider}`;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: `Could not sign in with ${provider}. Please try again.`,
      });
      trackEvent("auth_failure", { method: provider });
      setIsLoading(false);
    }
  };

  const handleMFASubmit = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual MFA verification
      const response = await fetch("/api/auth/mfa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: mfaCode }),
      });

      if (!response.ok) throw new Error("Invalid code");

      toast({
        title: "Verified!",
        description: "Signing you in...",
      });
      trackEvent("auth_success", { method: "password_mfa" });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Invalid code",
        description: "Please check your code and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      // TODO: Implement with Supabase
      await fetch("/api/auth/verify-resend", {
        method: "POST",
      });
      toast({
        title: "Verification email sent",
        description: "Please check your inbox.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send",
        description: "Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-[480px] relative z-10">
        {/* Top navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-2xl font-bold font-serif text-foreground">
            Learnify
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Main card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-custom-md">
          {/* Skip link for accessibility */}
          <a
            href="#signin-form"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
          >
            Skip to sign in form
          </a>

          {!showMFA ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold font-serif text-foreground mb-2">
                  Welcome back
                </h1>
                <p className="text-muted-foreground text-sm">
                  Sign in to continue to Learnify
                </p>
              </div>

              {/* Alert for rate limiting */}
              {attemptCount >= 5 && (
                <div
                  className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive"
                  role="alert"
                >
                  Too many failed attempts. Please wait before trying again.
                </div>
              )}

              {/* Form */}
              <form
                id="signin-form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                noValidate
              >
                {/* Email field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      className={`pl-10 ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      disabled={isLoading || attemptCount >= 5}
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p
                      id="email-error"
                      className="text-sm text-destructive flex items-center gap-1"
                      role="alert"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`pl-10 pr-10 ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      aria-invalid={errors.password ? "true" : "false"}
                      aria-describedby={errors.password ? "password-error" : undefined}
                      disabled={isLoading || attemptCount >= 5}
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      tabIndex={0}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p
                      id="password-error"
                      className="text-sm text-destructive flex items-center gap-1"
                      role="alert"
                    >
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => {
                        register("remember").onChange({
                          target: { value: checked, name: "remember" },
                        });
                      }}
                      disabled={isLoading}
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm text-muted-foreground cursor-pointer"
                    >
                      Remember me
                    </Label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                    tabIndex={0}
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading || attemptCount >= 5}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or sign in with
                  </span>
                </div>
              </div>

              {/* Social sign-in buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialSignIn("google")}
                  disabled={isLoading}
                  className="w-full"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialSignIn("linkedin")}
                  disabled={isLoading}
                  className="w-full"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </Button>
              </div>

              {/* Sign up link */}
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary font-medium hover:underline"
                  >
                    Create account
                  </Link>
                </p>
              </div>

              {/* Legal footer */}
              <div className="mt-6 text-center text-xs text-muted-foreground">
                By continuing, you agree to our{" "}
                <Link to="/terms" className="underline hover:text-foreground">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="underline hover:text-foreground">
                  Privacy Policy
                </Link>
                .
              </div>
            </>
          ) : (
            // MFA Step
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold font-serif mb-2">
                  Two-factor authentication
                </h2>
                <p className="text-muted-foreground text-sm">
                  Enter the 6-digit code from your authenticator app
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ""))}
                  className="text-center text-2xl tracking-widest"
                  autoFocus
                />

                <Button
                  onClick={handleMFASubmit}
                  className="w-full"
                  size="lg"
                  disabled={isLoading || mfaCode.length !== 6}
                >
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>

                <button
                  type="button"
                  onClick={() => setShowMFA(false)}
                  className="w-full text-sm text-muted-foreground hover:text-foreground"
                >
                  Back to sign in
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Additional help */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Need help?{" "}
          <Link to="/contact" className="text-primary hover:underline">
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
