import React, { useState } from "react";

type Props = {
  className?: string;
  animate?: boolean;
  size?: "small" | "medium" | "large" | "xlarge";
};

const XOrithmLogo: React.FC<Props> = ({
  className = "",
  animate = true,
  size = "medium",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses: Record<NonNullable<Props["size"]>, string> = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
    xlarge: "w-24 h-24",
  };

  return (
    <div
      className={`${className} ${sizeClasses[size]} relative flex items-center justify-center`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="img"
      aria-label="XOrithm logo"
    >
      <div className="relative w-full h-full">
        <div
          className={`absolute inset-0 bg-gradient-to-br from-secondary to-back rounded-2xl blur-xl opacity-30 ${
            animate && isHovered ? "animate-pulse" : ""
          }`}
        ></div>
        <div
          className={`relative w-full h-full bg-gradient-to-br from-secondary via-primary to-back rounded-2xl shadow-2xl transform transition-all duration-500 ${
            animate && isHovered ? "scale-110 rotate-3" : ""
          } flex items-center justify-center overflow-hidden`}
        >
          <div className="absolute inset-0">
            <div
              className={`absolute w-2 h-2 bg-white/20 rounded-full top-2 left-2 ${
                animate ? "animate-ping" : ""
              }`}
              style={{ animationDuration: "2s" }}
            ></div>
            <div
              className={`absolute w-2 h-2 bg-white/20 rounded-full bottom-3 right-3 ${
                animate ? "animate-ping" : ""
              }`}
              style={{ animationDuration: "3s", animationDelay: "0.5s" }}
            ></div>
          </div>
          <div className="relative z-10">
            <span
              className={`font-bold text-white transition-all duration-300 ${
                size === "small"
                  ? "text-xs"
                  : size === "medium"
                  ? "text-lg"
                  : size === "large"
                  ? "text-2xl"
                  : "text-4xl"
              }`}
            >
              <span
                className={`inline-block transition-transform duration-300 ${
                  animate && isHovered ? "scale-125" : ""
                }`}
              >
                X
              </span>
              <span
                className={`inline-block transition-transform duration-300 ${
                  animate && isHovered ? "scale-125 rotate-12" : ""
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                O
              </span>
            </span>
          </div>
          <div
            className={`absolute inset-0 opacity-10 font-mono text-xs text-white overflow-hidden ${
              animate ? "animate-pulse" : ""
            }`}
          >
            <div className="absolute top-0 left-0">01</div>
            <div className="absolute top-0 right-0">10</div>
            <div className="absolute bottom-0 left-0">11</div>
            <div className="absolute bottom-0 right-0">00</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XOrithmLogo;
