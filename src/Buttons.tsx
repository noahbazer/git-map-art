import React, { useContext } from 'react';
import { GridContext } from './CommitMap';

export const Buttons: React.FC = () => {
  const { clearAll, fillAll } = useContext(GridContext);

  const handleClearAll = () => {
    console.log('handleClearAll called');
    if (clearAll) {
      clearAll();
    }
  };

  const handleFillAll = () => {
    console.log('handleFillAll called');
    if (fillAll) {
      fillAll();
    }
  };

  return (
    <div>
      <button onClick={handleClearAll}>Clear All</button>
      <button onClick={handleFillAll}>Fill All</button>
    </div>
  );
};

export default Buttons;
