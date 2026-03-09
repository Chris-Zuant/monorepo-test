export interface LogInput {
  message: string
  level?: "info" | "warn" | "error"
}

export async function logActivity({ message, level = "info" }: LogInput) {
  console.log(`[${level.toUpperCase()}] ${message}`)

  return {
    logged: true
  }
}

// Datadog

// Cloudwatch

// Sentry

// custom audit logs