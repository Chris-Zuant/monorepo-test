import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/core/shadcn/components/ui/DropdownMenu.component';
import { CoreButton } from '@/core/components/buttons';
import { ChevronDown } from 'lucide-react';

export interface CoreDropdownMenuItem {
  id: string;
  label: string;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  separator?: boolean;
  isLabel?: boolean; // if true, this is a label, not a clickable item
}

export interface CoreDropdownMenuProps {
  trigger: React.ReactNode;
  items: CoreDropdownMenuItem[];
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const CoreDropdownMenu: React.FC<CoreDropdownMenuProps> = ({
  trigger,
  items,
  align = 'end',
  side = 'bottom',
  className,
  open,
  onOpenChange,
}) => {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} side={side} className={className}>
        {items.map((item) => {
          if (item.separator) {
            return <DropdownMenuSeparator key={item.id} />;
          }

          if (item.isLabel) {
            return (
              <DropdownMenuLabel key={item.id}>
                {item.label}
              </DropdownMenuLabel>
            );
          }

          return (
            <DropdownMenuItem
              key={item.id}
              onClick={item.onClick}
              disabled={item.disabled}
              className={item.selected ? 'bg-neutral-100' : ''}
            >
              <span>{item.label}</span>
              {item.selected && (
                <span className="ml-auto text-blue-600">✓</span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Convenience component for button triggers
export interface CoreDropdownButtonProps extends Omit<CoreDropdownMenuProps, 'trigger'> {
  buttonText: string;
  buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon';
  icon?: React.ReactNode;
}

export const CoreDropdownButton: React.FC<CoreDropdownButtonProps> = ({
  buttonText,
  buttonVariant = 'default',
  buttonSize = 'default',
  icon,
  ...dropdownProps
}) => {
  return (
    <CoreDropdownMenu
      {...dropdownProps}
      trigger={
        <CoreButton variant={buttonVariant} size={buttonSize} className="flex items-center gap-2">
          {icon}
          <span>{buttonText}</span>
          <ChevronDown className="w-4 h-4" />
        </CoreButton>
      }
    />
  );
};
