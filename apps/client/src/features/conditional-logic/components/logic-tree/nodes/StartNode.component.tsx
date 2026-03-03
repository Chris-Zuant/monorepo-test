import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { NodeWrapper } from './NodeWrapper';

const StartNode: React.FC<any> = ({ data, id }) => {
  return (
    <NodeWrapper id={id} className="start-node">
      <div className="cl-node-label">{data?.label || 'Start'}</div>
      <Handle type="source" position={Position.Bottom} />
    </NodeWrapper>
  );
};

export default StartNode;
