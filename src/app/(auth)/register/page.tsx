"use client";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { CgMail } from "react-icons/cg";
import Label from "@/components/ui/Label";
import { useState } from "react";
import { LuLock } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import XOrithmLogo from "@/components/ui/Logo";
import { BiUser } from "react-icons/bi";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
  });
  const [loading, setLoading] = useState(false);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    if (name === "name") {
      setErrors((prev) => ({ ...prev, nameError: "" }));
    }
    if (name === "email") {
      setErrors((prev) => ({ ...prev, emailError: "" }));
    }
    if (name === "password") {
      setErrors((prev) => ({ ...prev, passwordError: "" }));
    }
  };
  const validate = () => {
    const nextErrors = { nameError: "", emailError: "", passwordError: "" };
    if (!input.name || input.name.trim() === "") {
      nextErrors.nameError = "Name is required";
    }
    if (!input.email || input.email.trim() === "") {
      nextErrors.emailError = "Email is required";
    }
    if (!input.password) {
      nextErrors.passwordError = "Password is required";
    } else {
      const pwd = input.password;
      const lengthOk = pwd.length >= 8;
      const hasLetter = /[A-Za-z]/.test(pwd);
      const hasNumber = /[0-9]/.test(pwd);
      if (!lengthOk || !hasLetter || !hasNumber) {
        nextErrors.passwordError =
          "Password must be at least 8 characters and include letters and numbers";
      }
    }
    setErrors(nextErrors);
    return nextErrors;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validate();

    const hasErrors =
      validation.nameError || validation.emailError || validation.passwordError;
    if (hasErrors) return;
    setLoading(true);
    setInput({ name: "", email: "", password: "" });
    setLoading(false);
  };
  const handleEnterPress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-back">
      <div className="w-full max-w-md bg-background rounded-4xl  shadow p-5 ">
        <div className="flex flex-col space-y-4 items-center mb-2">
          <XOrithmLogo size="large" animate />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign up</h1>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3">
          <div className="space-y-2 text-sm ">
            <Label label="Name" id="name" />
            <Input
              id="name"
              type="text"
              placeHolder="Enter your name"
              leftIcon={<BiUser className="w-6 h-6 text-gray-400" />}
              onChange={(e) => handleOnChange(e)}
              name="name"
            />
            {errors.nameError && (
              <p className="text-red-500 text-xs font-semibold">
                {errors.nameError}
              </p>
            )}
          </div>
          <div className="space-y-2 text-sm ">
            <Label label="Email" id="email" />
            <Input
              id="email"
              type="text"
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
              className="bg-secondary text-white py-2 px-4 rounded-md w-full hover:bg-primary transition-all duration-200 cursor-pointer active:transform active:scale-95"
              aria-label="signup"
              onKeyDown={(e) => handleEnterPress(e)}
            >
              {loading ? "Getting Started..." : "Get Started"}
            </button>
            <p className="text-sm text-center text-muted-foreground font-semibold">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
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
          <button
            className="h-12 w-full bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer active:transform active:scale-95"
            aria-label="google"
          >
            <FcGoogle className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
