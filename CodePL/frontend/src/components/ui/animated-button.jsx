import React from "react";
import { motion } from "framer-motion";

const AnimatedButton = ({
  className = "",
  variant = "default",
  size = "default",
  asChild = false,
  glow = false,
  textEffect = "normal",
  uppercase = false,
  rounded = "md",
  hideAnimations = false,
  shimmerColor = "#ffffff",
  shimmerSize = "0.1em",
  shimmerDuration = "3s",
  borderRadius,
  background,
  children,
  ...props
}) => {
  const Comp = asChild ? "span" : "button";

  // Size classes
  const sizeClasses = {
    sm: "h-9 px-3 text-sm",
    default: "h-10 px-4 py-2",
    lg: "h-11 px-8 text-lg",
    icon: "h-10 w-10",
  };

  // Variant classes
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    ghost: "hover:bg-gray-100",
    link: "text-blue-600 underline",
    success: "bg-green-600 text-white hover:bg-green-700",
    warning: "bg-yellow-600 text-white hover:bg-yellow-700",
    info: "bg-blue-500 text-white hover:bg-blue-600",
    dark: "bg-gray-900 text-white hover:bg-gray-800",
    light: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    gradient: "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700",
    glass: "backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20",
  };

  // Rounded classes
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
    custom: "",
  };

  // Text effects
  const renderTextEffect = () => {
    if (hideAnimations) return children;

    switch (textEffect) {
      case "shimmer":
        return (
          <span
            className="shimmer-text inline-block"
            style={{
              backgroundImage: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
              backgroundSize: `200% 100%`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {children}
          </span>
        );
      case "gradient":
        return (
          <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {children}
          </span>
        );
      case "glitch":
        return (
          <span className="glitch-text" data-text={children}>
            {children}
          </span>
        );
      default:
        return children;
    }
  };

  return (
    <Comp
      className={`
        inline-flex items-center justify-center whitespace-nowrap font-medium
        transition-all duration-300 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        disabled:pointer-events-none disabled:opacity-50
        hover:scale-105 active:scale-95
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${roundedClasses[rounded]}
        ${uppercase ? "uppercase" : ""}
        ${glow && !hideAnimations ? "relative overflow-hidden" : ""}
        ${className}
      `}
      style={{
        borderRadius: borderRadius,
        background: background,
      }}
      {...props}
    >
      {renderTextEffect()}
      
      {/* Glow effect */}
      {glow && !hideAnimations && (
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(45deg, ${shimmerColor}20, transparent, ${shimmerColor}20)`,
            borderRadius: borderRadius || 'inherit',
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: parseFloat(shimmerDuration) || 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      
      {/* Shimmer overlay */}
      {glow && !hideAnimations && (
        <motion.div
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
            borderRadius: borderRadius || 'inherit',
          }}
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: parseFloat(shimmerDuration) || 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </Comp>
  );
};

export { AnimatedButton };