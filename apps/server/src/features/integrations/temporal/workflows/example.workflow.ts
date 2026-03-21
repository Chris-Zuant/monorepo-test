import { proxyActivities } from "@temporalio/workflow"
import type { IntegrationGraphDefinition } from "@monorepo/shared"
import type * as activities from "../activities"
import { buildIntegrationWorkflow } from "../../services/integrationWorkflowBuilder.service"
import { runIntegrationWorkflow } from "../../services/runIntegrationWorkflow.service"

const {
  httpRequestActivity,
  transformActivity,
  delayActivity,
  logActivity,
  randomFailureActivity,
  createContactActivity,
  checkConditionActivity,
  batchActivity,
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

export async function welcomeWorkflow(name: string = "world") {
  await logActivity({ message: `Welcome workflow started for ${name}` })
  return demoIntegrationWorkflow()
}

export async function runIntegrationGraphWorkflow(
  graph: IntegrationGraphDefinition,
  initialInput: unknown = null
) {
  const builtWorkflow = buildIntegrationWorkflow(graph)

  return runIntegrationWorkflow(builtWorkflow, {
    httpRequestActivity,
    transformActivity,
    delayActivity,
    logActivity,
    randomFailureActivity,
    createContactActivity,
    checkConditionActivity,
    batchActivity,
  }, initialInput)
}
