export const DEFAULT_PORT = "__default__"

export type BufferedInputs = Map<string, unknown[]>
export type BufferedNodeStore = Map<string, BufferedInputs>

export function getBufferKey(handle?: string) {
  return handle ?? DEFAULT_PORT
}

export function ensureNodeBuffer(store: BufferedNodeStore, nodeId: string) {
  let bufferedInputs = store.get(nodeId)
  if (!bufferedInputs) {
    bufferedInputs = new Map<string, unknown[]>()
    store.set(nodeId, bufferedInputs)
  }

  return bufferedInputs
}

export function takeBufferedInput(
  store: BufferedNodeStore,
  nodeId: string,
  preferredHandles: string[]
) {
  const bufferedInputs = ensureNodeBuffer(store, nodeId)

  for (const handle of preferredHandles) {
    const values = bufferedInputs.get(handle)
    if (values && values.length > 0) {
      return values.shift()
    }
  }

  return undefined
}

export function peekBufferedInputs(store: BufferedNodeStore, nodeId: string, handle: string) {
  return ensureNodeBuffer(store, nodeId).get(handle) ?? []
}

export function consumeBufferedInputs(
  store: BufferedNodeStore,
  nodeId: string,
  handles: string[]
) {
  const bufferedInputs = ensureNodeBuffer(store, nodeId)

  return handles.map((handle) => {
    const values = bufferedInputs.get(handle) ?? []
    return values.shift()
  })
}
