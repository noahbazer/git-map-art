import React, { useState, useEffect } from 'react';
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

  const handleClick = (row: number, col: number, increment: boolean) => {
    setGrid((prevGrid) => {
      const newGrid = JSON.parse(JSON.stringify(prevGrid));
      if (increment) {
        newGrid[row][col] = (newGrid[row][col] + 1) % 5;
      } else {
        newGrid[row][col] = newGrid[row][col] === 0 ? 0 : newGrid[row][col] - 1;
      }
      return newGrid;
    });
  };

  const [leftButtonDown, setLeftButtonDown] = useState(false);

  const handleMouseDown = (
    event: React.MouseEvent,
    row: number,
    col: number
  ) => {
    event.preventDefault();
    setMouseIsDown(true);
    setLeftButtonDown(event.button === 0);
    handleClick(row, col, event.button === 0);
  };

  const handleMouseOver = (row: number, col: number) => {
    if (mouseIsDown) {
      handleClick(row, col, leftButtonDown);
    }
  };

  const handleMouseUp = () => {
    setMouseIsDown(false);
    setLeftButtonDown(false);
  };

  const clearAll = () => {
    setGrid(Array(rows).fill(Array(cols).fill(0)));
  };

  const fillAll = () => {
    setGrid(Array(rows).fill(Array(cols).fill(4)));
  };

  useEffect(() => {
    const handleGlobalMouseDown = () => setMouseIsDown(true);
    const handleGlobalMouseUp = () => setMouseIsDown(false);

    window.addEventListener('mousedown', handleGlobalMouseDown);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleGlobalMouseDown);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  return (
    <GridContext.Provider value={{ clearAll, fillAll }}>
      <div
        className="grid"
        onMouseUp={handleMouseUp}
        onContextMenu={(event) => event.preventDefault()}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`cell level-${cell}`}
              onMouseDown={(event) => handleMouseDown(event, i, j)}
              onMouseOver={() => handleMouseOver(i, j)}
            />
          ))
        )}
      </div>
      <Buttons />
    </GridContext.Provider>
  );
};

export default CommitMap;
