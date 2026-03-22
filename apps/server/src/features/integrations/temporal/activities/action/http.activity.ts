import type { HttpRequestNode } from "@monorepo/shared"
import axios from "axios";

export interface HttpRequestActivityInput {
  node: HttpRequestNode
  payload?: unknown
}

export async function httpRequestActivity({ node, payload }: HttpRequestActivityInput) {
  const input = {
    ...node.config,
    body: node.config.body ?? payload,
  }

  const res = await axios.request({
    url: input.url,
    method: input.method ?? "GET",
    headers: {
      "content-type": "application/json",
      ...(input.headers ?? {})
    },
    data: input.body,
    responseType: "text",
    transformResponse: [(data) => data],
    validateStatus: () => true
  })

  const body = typeof res.data === "string" ? res.data : JSON.stringify(res.data)

  return {
    status: res.status,
    body
  }
}
