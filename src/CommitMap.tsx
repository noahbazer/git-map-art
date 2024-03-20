import React, { useState } from 'react';
import './App.css';
import Buttons from './Buttons'; // Import your Buttons component

export const GridContext = React.createContext({
  clearAll: () => {},
  fillAll: () => {},
});

const CommitMap: React.FC = () => {
  const rows = 7;
  const cols = 50;
  const initialGrid: number[][] = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(0));
  const [grid, setGrid] = useState(initialGrid);
  const [mouseIsDown, setMouseIsDown] = useState(false);

  const handleClick = (row: number, col: number) => {
    setGrid((prevGrid) => {
      const newGrid = JSON.parse(JSON.stringify(prevGrid));
      newGrid[row][col] = (newGrid[row][col] + 1) % 5;
      return newGrid;
    });
  };

  const handleMouseDown = (row: number, col: number) => {
    setMouseIsDown(true);
    handleClick(row, col);
  };

  const handleMouseOver = (row: number, col: number) => {
    if (mouseIsDown) {
      handleClick(row, col);
    }
  };

  const handleMouseUp = () => {
    setMouseIsDown(false);
  };

  const clearAll = () => {
    console.log('clearAll called');
    setGrid(Array(rows).fill(Array(cols).fill(0)));
  };

  const fillAll = () => {
    console.log('fillAll called');
    setGrid(Array(rows).fill(Array(cols).fill(4)));
  };

  return (
    <GridContext.Provider value={{ clearAll, fillAll }}>
      <div className="grid">
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`cell level-${cell}`}
              onMouseDown={() => handleMouseDown(i, j)}
              onMouseOver={() => handleMouseOver(i, j)}
              onMouseUp={handleMouseUp}
            />
          ))
        )}
      </div>
      <Buttons />
    </GridContext.Provider>
  );
};

export default CommitMap;
