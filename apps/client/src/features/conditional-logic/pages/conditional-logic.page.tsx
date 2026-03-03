import React from 'react';
import { LogicTreeCanvas } from '../components/logic-tree/conditional-logic-tree.component';

export const ConditionalLogicPage: React.FC = () => {

  return (
    <div className="w-full p-6 h-[90vh]">
      <LogicTreeCanvas></LogicTreeCanvas>
    </div>
  );
};

export default ConditionalLogicPage;

