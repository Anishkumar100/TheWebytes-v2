import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * TheWebytes Button — fully theme-aware, Awwwards-grade.
 * All variants automatically adapt to dark/light via CSS tokens.
 */
const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold " +
  "transition-all duration-300 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33D6E5]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-base)] " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 " +
  "active:scale-[0.97]",
  {
    variants: {
      variant: {
        // PRIMARY — vibrant cyan→teal gradient. Same in both themes (brand).
        default:
          "btn-brand-gradient btn-brand-gradient-hover text-[#0B0F18] font-bold " +
          "shadow-[0_8px_24px_-6px_rgba(51,214,229,0.45)] " +
          "hover:shadow-[0_14px_36px_-6px_rgba(51,214,229,0.65)] " +
          "border-0",

        // DESTRUCTIVE
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",

        // OUTLINE — adapts to theme via tokens
        outline:
          "border-2 border-[#33D6E5]/45 bg-transparent text-brand " +
          "hover:bg-[#33D6E5]/10 hover:border-[#33D6E5] hover:text-[#1D9FB4] dark:hover:text-[#8DF0FA] " +
          "shadow-sm",

        // SECONDARY — soft brand wash, theme aware
        secondary:
          "bg-[#4F7BB8]/12 text-brand border border-[#4F7BB8]/25 " +
          "hover:bg-[#4F7BB8]/22 hover:border-[#4F7BB8]/45",

        // GHOST
        ghost:
          "text-ink-muted hover:bg-[#33D6E5]/10 hover:text-brand",

        // LINK
        link:
          "text-brand underline-offset-4 hover:underline hover:text-[#33D6E5]",

        // GLASS — premium tinted glass
        glass:
          "glass-strong text-ink-strong hover:border-line-brand " +
          "hover:shadow-[0_12px_30px_-8px_rgba(51,214,229,0.3)]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm:      "h-9 rounded-lg px-3.5 text-xs",
        lg:      "h-12 rounded-xl px-7 text-base",
        xl:      "h-14 rounded-2xl px-9 text-base",
        icon:    "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = "Button"

export { Button, buttonVariants }
