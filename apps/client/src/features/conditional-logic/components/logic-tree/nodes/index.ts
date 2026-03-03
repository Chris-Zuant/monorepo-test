import DefaultNode from './DefaultNode.component';
import ConditionNode from './ConditionNode.component';
import StartNode from './StartNode.component';
import EndNode from './EndNode.component';
import QuestionNode from './QuestionNode.component';

export const nodeTypes = {
  default: DefaultNode,
  condition: ConditionNode,
  start: StartNode,
  end: EndNode,
  question: QuestionNode,
};

export const NODE_TYPES = [
  { id: 'default', label: 'Default Node' },
  { id: 'condition', label: 'Condition Node' },
  { id: 'question', label: 'Question Node' },
  { id: 'start', label: 'Start Node' },
  { id: 'end', label: 'End Node' },
];

export type NodeTypesMap = typeof nodeTypes;

export default nodeTypes;
