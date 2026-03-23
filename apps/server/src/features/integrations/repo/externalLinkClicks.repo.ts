import { getCollection } from "../../../app/db/getMongoCollection";

const DATABASE_NAME = "App";
const COLLECTION_NAME = "integration_link_clicks";

export interface ExternalLinkClickRecord {
  workflowId: string;
  nodeId: string;
  clickedAt: string;
  requestUrl: string;
}

export async function upsertExternalLinkClick(
  record: ExternalLinkClickRecord
): Promise<void> {
  const collection = await getCollection(DATABASE_NAME, COLLECTION_NAME);

  await collection.updateOne(
    {
      workflowId: record.workflowId,
      nodeId: record.nodeId,
    },
    {
      $set: record,
    },
    {
      upsert: true,
    }
  );
}

export async function consumeExternalLinkClick(
  workflowId: string,
  nodeId: string
): Promise<ExternalLinkClickRecord | null> {
  const collection = await getCollection(DATABASE_NAME, COLLECTION_NAME);
  const record = await collection.findOne<ExternalLinkClickRecord>({
    workflowId,
    nodeId,
  });

  if (!record) {
    return null;
  }

  await collection.deleteOne({
    workflowId,
    nodeId,
  });

  return record;
}
