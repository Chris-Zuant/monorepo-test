import { Worker } from "@temporalio/worker";
import * as activities from "./activities/index";
import path from "node:path";

export async function integrationWorkerRun() {
  const worker = await Worker.create({
    workflowsPath: path.join(__dirname, "workflows"),
    activities,
    taskQueue: "integration-task-queue",
  });

  await worker.run();
}
