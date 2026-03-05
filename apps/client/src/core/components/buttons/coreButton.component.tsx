import { cn } from "@/core/shadcn";
import { Button, type ButtonProps } from "@/core/shadcn/components/ui/Button.component";


type CoreButtonProps = ButtonProps & {
  
}

export function CoreButton({
  className,
  variant,
  ...props
}: CoreButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn(
        // base overrides
        "font-bold",
        "rounded-full",
        "shadow-sm",
        className
      )}
      {...props}
    />
  )
}