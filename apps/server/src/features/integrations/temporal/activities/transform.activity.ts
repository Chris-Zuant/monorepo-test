export interface TransformInput {
  data: any
}

export async function transformActivity({ data }: TransformInput) {
  const transformed = {
    ...data,
    processedAt: new Date().toISOString()
  }

  return transformed
}

// JSONata

// JS expressions

// template transforms