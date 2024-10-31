import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "bg-primary-color text-white font-bold shadow hover:bg-primary-color/90 dark:bg-white dark:text-primary-color dark:hover:bg-white/90",
        destructive:
          "bg-danger-color text-white font-bold shadow-sm hover:bg-danger-color/90 dark:bg-red-900 dark:text-white dark:hover:bg-red-900/90",
        outline:
          "border border-primary-color bg-white text-primary-color text-bold shadow-sm hover:bg-slate-100 hover:text-primary-color dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-white",
        secondary:
          "bg-success-color text-white font-bold shadow-sm hover:bg-success-color/80 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-800/80",
        ghost: "hover:bg-slate-100 hover:text-primary-color dark:hover:bg-slate-800 dark:hover:text-white",
        link: "text-primary-color underline-offset-4 hover:underline dark:text-white",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
