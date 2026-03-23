"use client"
import { useEffect, type CSSProperties } from "react"
import { Toaster as Sonner, toast, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"
import { useTheme } from "@/app/providers/theme/hooks/useTheme.hook"

type ToasterNotification = {
  id: string
  title: string
  description?: string
  variant?: "success" | "info" | "warning" | "error" | "loading"
}

type AppToasterProps = ToasterProps & {
  notification?: ToasterNotification | null
  onNotificationHandled?: (notificationId: string) => void
}

const Toaster = ({
  notification,
  onNotificationHandled,
  ...props
}: AppToasterProps) => {
  const { mode } = useTheme()

  useEffect(() => {
    if (!notification) {
      return
    }

    const variant = notification.variant ?? "info"
    toast[variant](notification.title, {
      description: notification.description,
    })
    onNotificationHandled?.(notification.id)
  }, [notification, onNotificationHandled])

  return (
    <Sonner
      theme={mode}
      position="top-center"
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}
export { Toaster }
export type { ToasterNotification }
