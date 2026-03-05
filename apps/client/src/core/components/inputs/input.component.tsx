import { Input, cn } from "@/core/shadcn";
import type { InputProps } from "@/core/shadcn/components/ui/Input.component";

export function CoreInput({ className, ...props }: InputProps) {
  return (
    <Input
      className={cn(
        "border-emerald-500 focus-visible:ring-emerald-500",
        className
      )}
      {...props}
    />
  )
}