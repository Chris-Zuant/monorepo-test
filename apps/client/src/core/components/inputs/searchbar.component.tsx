import { Input, cn } from "@/core/shadcn";
import type { InputProps } from "@/core/shadcn/components/ui/Input.component";
import { Search } from "lucide-react";
import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/shadcn/components/ui/Popover.component";
import { Button } from "@/core/shadcn/components/ui/Button.component";

interface SearchItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface SearchBarProps extends Omit<InputProps, 'onChange'> {
  items?: SearchItem[];
  onChange?: (value: string) => void;
  onItemSelect?: (item: SearchItem) => void;
  placeholder?: string;
}

export function SearchBar({
  className,
  items = [],
  onChange,
  onItemSelect,
  placeholder = "Search...",
  ...props
}: SearchBarProps) {
  const [value, setValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filteredItems = React.useMemo(() => {
    if (!value.trim()) return [];
    return items.filter(item =>
      item.label.toLowerCase().includes(value.toLowerCase())
    );
  }, [items, value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);

    // Open popover when user starts typing
    if (newValue.trim() && !isOpen) {
      setIsOpen(true);
    }
    // Close popover when input is cleared
    else if (!newValue.trim() && isOpen) {
      setIsOpen(false);
    }
  };

  const handleItemClick = (item: SearchItem) => {
    setValue(item.label);
    setIsOpen(false);
    onItemSelect?.(item);
    if (item.onClick) {
      item.onClick();
    }
    // Keep focus on input after selection
    inputRef.current?.focus();
  };

  return (
    <div className="relative flex-1 max-w-md">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <Input
              ref={inputRef}
              className={cn(
                "rounded-full",
                "pl-10 pr-4 h-9 text-sm",
                className
              )}
              value={value}
              onChange={handleInputChange}
              placeholder={placeholder}
              {...props}
            />
          </div>
        </PopoverTrigger>
        {filteredItems.length > 0 && (
          <PopoverContent 
            className="w-80 p-0" 
            align="start"
            side="bottom"
            sideOffset={4}
            avoidCollisions={false}
            onOpenAutoFocus={(e) => e.preventDefault()} // Prevent focus stealing
            onCloseAutoFocus={(e) => e.preventDefault()} // Prevent focus stealing
          >
            <div className="max-h-64 overflow-y-auto">
              {filteredItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 text-left"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Button>
              ))}
            </div>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}