import axios from "axios";

export interface HttpRequestInput {
  url: string
  method?: "GET" | "POST" | "PUT" | "DELETE"
  headers?: Record<string, string>
  body?: unknown
}

export async function httpRequestActivity(input: HttpRequestInput) {
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
