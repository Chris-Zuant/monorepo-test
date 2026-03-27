import { proxyActivities } from "@temporalio/workflow"
import type { IntegrationGraphDefinition } from "@monorepo/shared"
import type * as activities from "../activities/index"
import { ActionNodeExecutor } from "../../services/executeActionNode.service"
import { RelationshipNodeExecutor } from "../../services/executeRelationshipNode.service"
import { TriggerNodeExecutor } from "../../services/executeTriggerNode.service"
import { IntegrationWorkflowBuilder } from "../../services/integrationWorkflowBuilder.service"
import { IntegrationWorkflowRunner } from "../../services/runIntegrationWorkflow.service"
import { createWaitForExternalLinkClickRuntime } from "../runtime"

const {
  httpRequestActivity,
  delayActivity,
  transformActivity,
  logActivity,
  randomFailureActivity,
  createContactActivity,
  batchActivity,
} = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
})

export async function runIntegrationGraphWorkflow(
  graph: IntegrationGraphDefinition
) {

  const builtWorkflow = IntegrationWorkflowBuilder.build(graph);
  const waitForExternalLinkClick = createWaitForExternalLinkClickRuntime()
  const runner = new IntegrationWorkflowRunner({
    actionExecutor: new ActionNodeExecutor(
      {
        httpRequestActivity,
        delayActivity,
        transformActivity,
        logActivity,
        randomFailureActivity,
        createContactActivity,
        batchActivity,
      },
      {
        waitForExternalLinkClick,
      }
    ),
    relationshipExecutor: new RelationshipNodeExecutor(),
    triggerExecutor: new TriggerNodeExecutor(),
  })

  return runner.run(builtWorkflow)
}
