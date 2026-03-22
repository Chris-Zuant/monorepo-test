import { proxyActivities } from "@temporalio/workflow"
import type { IntegrationGraphDefinition } from "@monorepo/shared"
import type * as activities from "../activities/index"
import { buildIntegrationWorkflow } from "../../services/integrationWorkflowBuilder.service"
import { runIntegrationWorkflow } from "../../services/runIntegrationWorkflow.service"

const {
  httpRequestActivity,
  delayActivity,
  transformActivity,
  logActivity,
  randomFailureActivity,
  createContactActivity,
  batchActivity,
  conditionRelationshipActivity,
  fanOutRelationshipActivity,
  joinRelationshipActivity,
  collectRelationshipActivity,
  mapRelationshipActivity,
  reduceRelationshipActivity,
} = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
})

export async function runIntegrationGraphWorkflow(
  graph: IntegrationGraphDefinition,
  initialInput: unknown = null
) {
  const builtWorkflow = buildIntegrationWorkflow(graph)

  return runIntegrationWorkflow(
    builtWorkflow,
    {
      httpRequestActivity,
      delayActivity,
      transformActivity,
      logActivity,
      randomFailureActivity,
      createContactActivity,
      batchActivity,
      conditionRelationshipActivity,
      fanOutRelationshipActivity,
      joinRelationshipActivity,
      collectRelationshipActivity,
      mapRelationshipActivity,
      reduceRelationshipActivity,
    },
    initialInput
  )
}
