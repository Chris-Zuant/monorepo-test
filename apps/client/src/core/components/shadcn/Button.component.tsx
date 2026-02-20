import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-white",
        destructive: "text-white",
        outline: "border",
        secondary: "text-neutral-900",
        ghost: "",
        link: "underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", style, ...props }, ref) => {
    const getThemeStyles = () => {
      const baseStyle: React.CSSProperties = {
        transitionProperty: 'background-color, color, border-color',
        transitionDuration: '200ms'
      }

      switch (variant) {
        case "default":
          return {
            ...baseStyle,
            backgroundColor: 'var(--primary-color)',
            color: 'var(--bg-primary)',
            ':hover': { backgroundColor: 'var(--primary-color, #007bff)' }
          }
        case "destructive":
          return {
            ...baseStyle,
            backgroundColor: 'var(--danger-color)',
            color: 'var(--bg-primary)'
          }
        case "outline":
          return {
            ...baseStyle,
            borderColor: 'var(--border-color)',
            backgroundColor: 'transparent',
            color: 'var(--text-primary)'
          }
        case "secondary":
          return {
            ...baseStyle,
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)'
          }
        case "ghost":
          return {
            ...baseStyle,
            backgroundColor: 'transparent',
            color: 'var(--text-primary)'
          }
        case "link":
          return {
            ...baseStyle,
            backgroundColor: 'transparent',
            color: 'var(--primary-color)',
            padding: 0
          }
        default:
          return baseStyle
      }
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        style={{ ...getThemeStyles(), ...style }}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
