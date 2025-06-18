// src/components/Board/Board.tsx
import React from 'react';
import { useAppSelector } from '../../store/hooks';
import TaskCard from './TaskCard';

const BoardComponent = () => {
  const board = useAppSelector((state) => state.board.currentBoard);
  const errorMessage = useAppSelector((state) => state.board.error);

  if (errorMessage) return <p style={{ color: 'red' }}>{errorMessage}</p>;
  if (!board) return <p>No board loaded.</p>;

  return (
    <div>
      <h2>Name: {board.name}</h2>
      <h2>Board id: {board.id}</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {Object.entries(board.columns).map(([columnName, tasks]) => (
          <TaskCard
            key={columnName}
            columnName={columnName}
            tasks={tasks}
            boardId={board.id}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardComponent;
