import type { IntegrationGraphDefinition } from "@monorepo/shared"
import { IntegrationWorkflowRunner } from "../../services/runIntegrationWorkflow.service"

export async function runIntegrationGraphWorkflow(
  graph: IntegrationGraphDefinition
) {

  const runner = new IntegrationWorkflowRunner(graph)

  return runner.run()
}
