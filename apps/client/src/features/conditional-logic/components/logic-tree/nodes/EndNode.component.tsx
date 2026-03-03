import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { NodeWrapper } from './NodeWrapper';

const EndNode: React.FC<any> = ({ data, id }) => {
  return (
    <NodeWrapper id={id} className="end-node">
      <Handle type="target" position={Position.Top} />
      <div className="cl-node-label">{data?.label ?? 'End'}</div>
    </NodeWrapper>
  );
};

export default EndNode;
