import { Input, cn } from "@/core/shadcn";
import type { InputProps } from "@/core/shadcn/components/ui/Input.component";
import { Search } from "lucide-react";


export function SearchBar({ className, ...props }: InputProps) {
    return (
        <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <Input
                className={cn(
                    "",
                    className
                )}
                {...props}
            />
        </div>
    )
}