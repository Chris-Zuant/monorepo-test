import React from 'react';
import { LogicTreeCanvas } from '../components/conditional-logic-tree.component';

export const ConditionalLogicPage: React.FC = () => {

  return (
    <div className="w-full p-6">
      <LogicTreeCanvas></LogicTreeCanvas>
    </div>
  );
};

export default ConditionalLogicPage;

