import { proxyActivities } from "@temporalio/workflow"
import type { DelayNode, HttpRequestNode, LogNode } from "@monorepo/shared"
import type * as activities from "../activities/index"

const {
  httpRequestActivity,
  delayActivity,
  logActivity,
} = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute"
})

export async function demoIntegrationWorkflow() {
  const logNode: LogNode = {
    id: "example-log",
    nodeKind: "action",
    type: "log",
    name: "Example Log",
    position: { x: 0, y: 0 },
    config: { message: "Workflow started" },
  }
  const httpNode: HttpRequestNode = {
    id: "example-http",
    nodeKind: "action",
    type: "httpRequest",
    name: "Example Request",
    position: { x: 0, y: 0 },
    config: { url: "https://jsonplaceholder.typicode.com/todos/1" },
  }
  const delayNode: DelayNode = {
    id: "example-delay",
    nodeKind: "action",
    type: "delay",
    name: "Example Delay",
    position: { x: 0, y: 0 },
    config: { ms: 2000 },
  }

  await logActivity({ node: logNode })

  const apiResult = await httpRequestActivity({ node: httpNode })

  await delayActivity({ node: delayNode })

  await logActivity({
    node: {
      ...logNode,
      id: "example-log-completed",
      config: { message: "Workflow completed" },
    }
  })

  return apiResult
}

export async function welcomeWorkflow(name: string = "world") {
  await logActivity({
    node: {
      id: "welcome-log",
      nodeKind: "action",
      type: "log",
      name: "Welcome Log",
      position: { x: 0, y: 0 },
      config: { message: `Welcome workflow started for ${name}` },
    },
  })
  return demoIntegrationWorkflow()
}
