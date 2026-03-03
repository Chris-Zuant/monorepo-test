import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { NodeWrapper } from './NodeWrapper';

const ConditionNode: React.FC<any> = ({ data, id }) => {
  return (
    <NodeWrapper id={id} className="condition-node">
      <Handle type="target" position={Position.Top} />
      <div className="cl-node-label">{data?.label ?? 'Condition'}</div>
      <Handle type="source" position={Position.Bottom} />
    </NodeWrapper>
  );
};

export default ConditionNode;
