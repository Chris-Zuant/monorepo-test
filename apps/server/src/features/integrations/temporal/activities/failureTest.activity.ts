export interface RandomFailureInput {
  failureRate?: number
}

export async function randomFailureActivity({ failureRate = 0.5 }: RandomFailureInput) {
  if (Math.random() < failureRate) {
    throw new Error("Simulated integration failure")
  }

  return {
    success: true
  }
}

// For testing retrys

// retry policies

// failure handling

// UI error states