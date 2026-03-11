import mongoose from 'mongoose';
import type { IntegrationGraphDefinition } from '@monorepo/shared';
import { getCollection } from '../../../app/db/getMongoCollection';

const DATABASE_NAME = 'App';
const COLLECTION_NAME = 'intergrations_graphs';

const integrationGraphSchema = new mongoose.Schema<IntegrationGraphDefinition>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    nodes: [
      new mongoose.Schema(
        {
          id: { type: String, required: true },
          type: { type: String, required: true },
          name: { type: String, required: true },
          position: {
            x: { type: Number, required: true },
            y: { type: Number, required: true },
          },
          config: { type: mongoose.Schema.Types.Mixed, default: {} },
        },
        { _id: false }
      ),
    ],
    edges: [
      new mongoose.Schema(
        {
          id: { type: String, required: true },
          source: { type: String, required: true },
          sourceHandle: { type: String, required: false },
          target: { type: String, required: true },
          targetHandle: { type: String, required: false },
          label: { type: String, required: false },
        },
        { _id: false }
      ),
    ],
  },
  {
    versionKey: false,
    strict: true,
  }
);

const IntegrationGraphValidationModel =
  mongoose.models.IntegrationGraphValidation ||
  mongoose.model<IntegrationGraphDefinition>(
    'IntegrationGraphValidation',
    integrationGraphSchema
  );

const validateIntegrationGraph = (graph: IntegrationGraphDefinition): IntegrationGraphDefinition => {
  const document = new IntegrationGraphValidationModel(graph);
  const validationError = document.validateSync();

  if (validationError) {
    throw validationError;
  }

  const validatedGraph = document.toObject() as IntegrationGraphDefinition & { _id?: unknown };
  delete validatedGraph._id;

  return validatedGraph;
};

export const upsertIntegrationGraph = async (
  graph: IntegrationGraphDefinition
): Promise<IntegrationGraphDefinition> => {
  const validatedGraph = validateIntegrationGraph(graph);
  const collection = await getCollection(DATABASE_NAME, COLLECTION_NAME);

  await collection.updateOne(
    { id: validatedGraph.id },
    { $set: validatedGraph },
    { upsert: true }
  );

  return validatedGraph;
};

export const getAllIntegrationGraphs = async (): Promise<IntegrationGraphDefinition[]> => {
  const collection = await getCollection(DATABASE_NAME, COLLECTION_NAME);
  const documents = await collection
    .find<IntegrationGraphDefinition>({}, { projection: { _id: 0 } })
    .toArray();

  return documents;
};

export const getOneIntegrationGraph = async (id: string): Promise<IntegrationGraphDefinition | null> => {
  const collection = await getCollection(DATABASE_NAME, COLLECTION_NAME);
  const document = await collection
    .findOne<IntegrationGraphDefinition>({id}, { projection: { _id: 0 } })

  return document;
};
