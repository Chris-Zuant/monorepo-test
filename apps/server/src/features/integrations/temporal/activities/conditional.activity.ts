export interface ConditionInput {
  value: number
}

export async function checkConditionActivity({ value }: ConditionInput) {
  return {
    result: value > 10
  }
}

// If
// Switch
// Router