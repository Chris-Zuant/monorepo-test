import type {
  IntegrationNodeDefinition,
  RelationshipNodeDefinition,
  TriggerNodeDefinition,
} from "../models/reactFlowNodeData.types";

export function buildInitialConfig(
  definition: IntegrationNodeDefinition | RelationshipNodeDefinition | TriggerNodeDefinition
) {
  const schemaDefaults = Object.fromEntries(
    definition.configSchema
      .filter((field) => field.defaultValue !== undefined)
      .map((field) => [field.key, field.defaultValue])
  );

  if (definition.nodeKind !== 'relationship') {
    return schemaDefaults;
  }

  switch (definition.type) {
    case 'condition':
      return schemaDefaults;
    case 'fanOut':
      return schemaDefaults;
    case 'join':
      return schemaDefaults;
    case 'collect':
      return {
        emitMode: 'array',
        ...schemaDefaults,
      };
    case 'map':
      return schemaDefaults;
    case 'reduce':
      return {
        ...schemaDefaults,
      };
    default:
      return schemaDefaults;
  }
}
