import { useEffect, useMemo, useState } from "react";
import type { Node } from "@xyflow/react";
import { useDispatch } from "react-redux";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/shadcn/components/ui/Dialog.component";
import { Button } from "@/core/shadcn/components/ui/Button.component";
import { Input } from "@/core/shadcn/components/ui/Input.component";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/shadcn/components/ui/Select.component";
import { Textarea } from "@/core/shadcn/components/ui/TextArea.component";
import type { NodeConfigFieldDefinition, ReactFlowNodeData } from "../../../models/reactFlowNodeData.types";
import { updateNodeConfig } from "../../../store/integrations.slice";

interface NodeConfigEditorModalProps {
  node: Node<ReactFlowNodeData> | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function getInitialDraft(
  schema: NodeConfigFieldDefinition[],
  config: Record<string, unknown>
): Record<string, string> {
  return schema.reduce<Record<string, string>>((acc, field) => {
    const rawValue = config[field.key] ?? field.defaultValue;

    if (field.kind === "json") {
      acc[field.key] =
        rawValue === undefined ? "" : JSON.stringify(rawValue, null, 2);
      return acc;
    }

    acc[field.key] = rawValue === undefined || rawValue === null ? "" : String(rawValue);
    return acc;
  }, {});
}

function parseFieldValue(field: NodeConfigFieldDefinition, value: string): unknown {
  if (field.kind === "number") {
    return value === "" ? undefined : Number(value);
  }

  if (field.kind === "json") {
    return value.trim() === "" ? undefined : JSON.parse(value);
  }

  return value;
}

export function NodeConfigEditorModal({
  node,
  open,
  onOpenChange,
}: NodeConfigEditorModalProps) {
  const dispatch = useDispatch();
  const schema = node?.data.configSchema ?? [];
  const [draftConfig, setDraftConfig] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!node || !open) {
      return;
    }

    setDraftConfig(getInitialDraft(schema, node.data.config));
    setErrorMessage(null);
  }, [node, open, schema]);

  const canSave = useMemo(() => {
    return schema.every((field) => {
      if (!field.required) {
        return true;
      }

      const value = draftConfig[field.key]?.trim() ?? "";
      return value.length > 0;
    });
  }, [draftConfig, schema]);

  const handleValueChange = (key: string, value: string) => {
    setDraftConfig((current) => ({
      ...current,
      [key]: value,
    }));
    setErrorMessage(null);
  };

  const handleSave = () => {
    if (!node) {
      return;
    }

    try {
      const nextConfig = schema.reduce<Record<string, unknown>>((acc, field) => {
        const parsedValue = parseFieldValue(field, draftConfig[field.key] ?? "");

        if (parsedValue !== undefined) {
          acc[field.key] = parsedValue;
        }

        return acc;
      }, {});

      dispatch(updateNodeConfig({ nodeId: node.id, config: nextConfig }));
      onOpenChange(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Invalid configuration value"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-hidden p-0">
        <DialogHeader className="border-b px-6 pt-6 pb-4">
          <DialogTitle>{node?.data.label ?? "Node Config"}</DialogTitle>
          <DialogDescription>
            {node?.data.description ?? "Configure this node before running the integration."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto px-6 py-4">
          {schema.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              This node does not expose configurable fields.
            </p>
          ) : (
            schema.map((field) => (
              <div key={field.key} className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                  {field.label}
                  {field.required ? <span className="text-destructive"> *</span> : null}
                </label>

                {field.kind === "select" ? (
                  <Select
                    value={draftConfig[field.key] ?? ""}
                    onValueChange={(value) => handleValueChange(field.key, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : field.kind === "json" ? (
                  <Textarea
                    className="min-h-40 font-mono text-sm"
                    value={draftConfig[field.key] ?? ""}
                    onChange={(event) => handleValueChange(field.key, event.target.value)}
                    placeholder="{}"
                  />
                ) : (
                  <Input
                    type={field.kind === "number" ? "number" : "text"}
                    value={draftConfig[field.key] ?? ""}
                    onChange={(event) => handleValueChange(field.key, event.target.value)}
                  />
                )}
              </div>
            ))
          )}

          {errorMessage ? (
            <p className="text-destructive text-sm">{errorMessage}</p>
          ) : null}
        </div>

        <DialogFooter className="px-6" showCloseButton>
          <Button onClick={handleSave} disabled={!canSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NodeConfigEditorModal;
