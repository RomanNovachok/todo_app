import React from 'react';
import { Board, Task } from '../../types/types';
import TaskCard from './TaskCard';

type Props = {
  board: Board | null;
  errorMessage?: string | null;
  onBoardUpdate: (updatedBoard: Board) => void;
};


const BoardComponent = ({ board, errorMessage, onBoardUpdate }: Props) => {
  if (errorMessage) return <p>{errorMessage}</p>;
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
            onBoardUpdate={onBoardUpdate} 
          />
        ))}
      </div>
    </div>
  );
};


export default BoardComponent;
