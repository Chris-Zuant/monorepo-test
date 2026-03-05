/**
 * @fileoverview Client application barrel export
 * 
 * This file re-exports all public APIs from the client application,
 * making it easy for external tools like Docusaurus to consume components and types.
 * 
 * Note: API client functions that use Vite-specific imports are documented in the feature modules.
 * 
 * Usage:
 * import { Button, Input, DropdownMenu, Form, Integration } from '@monorepo/client';
 */

// ============================================================================
// Core UI Components - shadcn components
// ============================================================================
/**
 * Primary button component with multiple variants
 * @component
 */
export { Button, buttonVariants } from './core/shadcn/components/ui/Button.component';
export type { ButtonProps } from './core/shadcn/components/ui/Button.component';

/**
 * Standard input field component
 * @component
 */
export { Input } from './core/shadcn/components/ui/Input.component';
export type { InputProps } from './core/shadcn/components/ui/Input.component';

/**
 * Dropdown menu component with support for items, separators, and sub-menus
 * @component
 */
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from './core/shadcn/components/ui/DropdownMenu.component';

// ============================================================================
// Utilities
// ============================================================================
/**
 * Utility functions for className management and other common operations
 */
export * from './core/shadcn/lib/utils';

// ============================================================================
// Form Builder Feature - Type definitions
// ============================================================================
/**
 * Form builder types and interfaces
 */
export type { Form } from './features/form-builder/form-builder.types';

// ============================================================================
// Integrations Feature - Type definitions
// ============================================================================
/**
 * Integration configuration types
 */
export type { Integration } from './features/integrations/integrations.types';

// ============================================================================
// Commonly used React types for component development
// ============================================================================
export type {
  ReactNode,
  ReactElement,
  FC,
  PropsWithChildren,
  CSSProperties,
  HTMLAttributes,
  InputHTMLAttributes,
  ButtonHTMLAttributes,
} from 'react';
