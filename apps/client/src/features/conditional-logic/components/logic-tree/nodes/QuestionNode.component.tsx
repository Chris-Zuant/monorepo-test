import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { NodeWrapper } from './NodeWrapper.component';

const QuestionNode: React.FC<any> = ({ data, id }) => {
  return (
    <NodeWrapper id={id} className="question-node">
      <Handle type="target" position={Position.Top} />
      <div className="cl-node-label">{data?.label ?? 'Question'}</div>
      <Handle type="source" position={Position.Bottom} />
    </NodeWrapper>
  );
};

export default QuestionNode;
