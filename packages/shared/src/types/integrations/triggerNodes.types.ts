import type { IntegrationGraphNodeBase } from "./integration.types"

export const TriggerNodeType = {
  InternalLeadForm: "internalLeadForm",
  WebhookLead: "webhookLead",
} as const

export type TriggerNodeType = (typeof TriggerNodeType)[keyof typeof TriggerNodeType]

export interface LeadTriggerConfig {
  firstName: string
  lastName: string
  company: string
  emailAddress: string
}

export interface BaseTriggerNode<
  TType extends TriggerNodeType,
  TConfig
> extends IntegrationGraphNodeBase<TType, "trigger"> {
  config: TConfig
}

export interface InternalLeadFormTriggerNode
  extends BaseTriggerNode<"internalLeadForm", LeadTriggerConfig> {
  type: "internalLeadForm"
}

export interface WebhookLeadTriggerNode
  extends BaseTriggerNode<"webhookLead", LeadTriggerConfig> {
  type: "webhookLead"
}

export type TriggerGraphNode =
  | InternalLeadFormTriggerNode
  | WebhookLeadTriggerNode
