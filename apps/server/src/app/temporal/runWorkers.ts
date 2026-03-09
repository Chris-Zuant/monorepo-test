import { integrationWorkerRun } from "../../features/integrations/temporal/integration.worker";

const RETRY_DELAY_MS = 5000;

async function startWorkerWithRetry() {
  while (true) {
    try {
      await integrationWorkerRun();
      return;
    } catch (err) {
      console.error(`Temporal worker failed to start. Retrying in ${RETRY_DELAY_MS}ms...`, err);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
}

startWorkerWithRetry().catch((err) => {
  console.error("Unexpected worker runner failure", err);
  process.exit(1);
});
