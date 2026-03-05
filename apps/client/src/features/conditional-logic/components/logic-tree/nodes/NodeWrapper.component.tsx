import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { removeNode } from '../../../store';
import './node.css';
import { X } from 'lucide-react';

interface NodeWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const NodeWrapper: React.FC<NodeWrapperProps> = ({ id, children, className = 'default-node' }) => {
  const dispatch = useDispatch();

  const handleDeleteNode = useCallback(() => {
    dispatch(removeNode(id));
  }, [id, dispatch]);

  return (
    <div className={`cl-node ${className}`}>
      <div className="cl-node-wrapper">
        {children}
        <button
          onClick={handleDeleteNode}
          className="cl-node-delete-btn"
          title="Delete node"
          type="button"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
