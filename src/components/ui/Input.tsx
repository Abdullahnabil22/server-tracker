import React, { InputHTMLAttributes } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  type: string;
  placeHolder: string;
  showPasswordToggle?: boolean;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  isPassword?: boolean;
};
export default function Input({
  className,
  type,
  placeHolder,
  showPasswordToggle,
  onClick,
  leftIcon,
  isPassword = false,
  ...props
}: InputProps) {
  const paddingRight = isPassword && showPasswordToggle ? "pr-12" : "pr-4";
  const paddingLeft = leftIcon ? "pl-12" : "pl-4";
  return (
    <div className="relative">
      {leftIcon && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {leftIcon}
        </div>
      )}
      <input
        data-slot="input"
        className={`py-2.5 px-4 ${paddingLeft} ${paddingRight} border border-gray-300 text-input-text rounded-md h-11 w-full min-w-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none outline-none focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px] ${className}`}
        type={type}
        placeholder={placeHolder}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={onClick}
          aria-label={showPasswordToggle ? "Hide password" : "Show password"}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          {showPasswordToggle ? (
            <FiEyeOff className="w-5 h-5" />
          ) : (
            <FiEye className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
}

Input.displayName = "Input";
