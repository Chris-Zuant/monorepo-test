import type { IntegrationNodeDefinition, RelationshipNodeDefinition } from "../models/reactFlowNodeData.types";

export function buildInitialConfig(
  definition: IntegrationNodeDefinition | RelationshipNodeDefinition
) {
  const schemaDefaults = Object.fromEntries(
    definition.configSchema
      .filter((field) => field.defaultValue !== undefined)
      .map((field) => [field.key, field.defaultValue])
  );

  if (definition.category !== 'relationship') {
    return schemaDefaults;
  }

  switch (definition.type) {
    case 'condition':
      return {
        ...schemaDefaults,
        outputPorts: definition.outputs.map((port) => port.id),
      };
    case 'fanOut':
      return {
        ...schemaDefaults,
        outputPorts: definition.outputs.map((port) => port.id),
      };
    case 'join':
      return {
        ...schemaDefaults,
        inputPorts: definition.inputs.map((port) => port.id),
      };
    case 'collect':
      return {
        emitMode: 'array',
        ...schemaDefaults,
      };
    case 'map':
      return {
        ...schemaDefaults,
        itemPortId: definition.outputs[0]?.id ?? 'item',
      };
    case 'reduce':
      return {
        ...schemaDefaults,
      };
    default:
      return schemaDefaults;
  }
}