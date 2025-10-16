"use client";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { CgMail } from "react-icons/cg";
import Label from "@/components/ui/Label";
import { useEffect, useState } from "react";
import { LuLock } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import XOrithmLogo from "@/components/ui/Logo";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import AuthLoading from "@/components/AuthLoading";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return <AuthLoading />;
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    if (name === "email") {
      setErrors((prev) => ({ ...prev, emailError: "" }));
    }
    if (name === "password") {
      setErrors((prev) => ({ ...prev, passwordError: "" }));
    }
  };

  const validate = () => {
    const nextErrors = { emailError: "", passwordError: "" };
    if (!input.email || input.email.trim() === "") {
      nextErrors.emailError = "Email is required";
    }
    if (!input.password) {
      nextErrors.passwordError = "Password is required";
    }
    setErrors(nextErrors);
    return nextErrors;
  };

  const handleLogin = async () => {
    setLoading(true);
    const result = await login(input.email, input.password);

    setLoading(false);
    if (result.success) {
      router.push("/");
    } else {
      setError(result.error || "Login failed");
    }

    return result;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validate();

    const hasErrors = validation.emailError || validation.passwordError;
    if (hasErrors) return;

    await handleLogin();

    setInput({ email: "", password: "" });
  };
  const handleEnterPress = async (
    e: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-back">
      <div className="w-full max-w-md bg-background rounded-4xl shadow p-5 ">
        <div className="flex flex-col space-y-4 items-center mb-2">
          <XOrithmLogo size="large" animate />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sign in with email
          </h1>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3">
          <div className="space-y-2 text-sm ">
            <Label label="Email" id="email" />
            <Input
              id="email"
              type="text"
              value={input.email}
              placeHolder="Enter your email"
              leftIcon={<CgMail className="w-6 h-6 text-gray-400" />}
              onChange={(e) => handleOnChange(e)}
              name="email"
            />
            {errors.emailError && (
              <p className="text-red-500 text-xs font-semibold">
                {errors.emailError}
              </p>
            )}
          </div>
          <div className="space-y-2 text-sm ">
            <Label label="Password" id="password" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={input.password}
              placeHolder="Enter your password"
              leftIcon={<LuLock className="w-6 h-6 text-gray-400" />}
              showPasswordToggle={showPassword}
              onClick={() => setShowPassword(!showPassword)}
              isPassword={true}
              onChange={(e) => handleOnChange(e)}
              name="password"
            />
            {errors.passwordError && (
              <p className="text-red-500 text-xs font-semibold">
                {errors.passwordError}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-secondary text-white py-2 px-4 rounded-md w-full hover:bg-primary transition-all duration-200 cursor-pointer active:transform active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label="login"
              onKeyDown={(e) => handleEnterPress(e)}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && (
              <p className="text-red-500 text-sm font-semibold">{error}</p>
            )}
            <p className="text-sm text-center text-muted-foreground font-semibold">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
        <div className="flex items-center gap-3 mt-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-600">Or sign in with</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div className="mt-6">
          <button className="h-12 w-full bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer active:transform active:scale-95">
            <FcGoogle className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
