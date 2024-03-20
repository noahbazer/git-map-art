import React, { useState } from 'react';
import './App.css';

const CommitMap: React.FC = () => {
  const rows = 7;
  const cols = 50;
  const initialGrid: number[][] = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(0));
  const [grid, setGrid] = useState(initialGrid);

  const handleClick = (row: number, col: number) => {
    setGrid((prevGrid) => {
      const newGrid = JSON.parse(JSON.stringify(prevGrid));
      newGrid[row][col] = (newGrid[row][col] + 1) % 5;
      return newGrid;
    });
  };

  return (
    <div className="grid">
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            className={`cell level-${cell}`}
            onClick={() => handleClick(i, j)}
          />
        ))
      )}
    </div>
  );
};

export default CommitMap;
