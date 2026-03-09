export interface BatchInput {
  items: any[]
}

export async function batchActivity({ items }: BatchInput) {
  return items.map((item, index) => ({
    ...item,
    batchIndex: index
  }))
}

// list iteration

// fan-out workflows

// batch processing