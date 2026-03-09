export interface DelayInput {
  ms: number
}

export async function delayActivity({ ms }: DelayInput) {
  await new Promise((resolve) => setTimeout(resolve, ms))

  return {
    waited: ms
  }
}

// Wait 5 minutes