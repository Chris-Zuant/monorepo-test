import { proxyActivities } from "@temporalio/workflow"
import type * as activities from "../activities"

const {
  httpRequestActivity,
  transformActivity,
  delayActivity,
  logActivity
} = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute"
})

export async function demoIntegrationWorkflow() {
  await logActivity({ message: "Workflow started" })

  const apiResult = await httpRequestActivity({
    url: "https://jsonplaceholder.typicode.com/todos/1"
  })

  const transformed = await transformActivity({
    data: apiResult
  })

  await delayActivity({ ms: 2000 })

  await logActivity({
    message: "Workflow completed"
  })

  return transformed
}