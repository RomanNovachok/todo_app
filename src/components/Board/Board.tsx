import React from 'react';

type Task = {
  title: string;
  description: string;
};

type Board = {
  id: string;
  name: string;
  columns: Record<string, Task[]>;
};

type Props = {
  board: Board | null;
};

const BoardComponent = ({ board }: Props) => {
  if (!board) return <p>No board loaded.</p>;

  return (
    <div>
      <h2>{board.name}</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {Object.entries(board.columns).map(([columnName, tasks]) => (
          <div key={columnName}>
            <h3>{columnName}</h3>
            <ul>
              {tasks.map((task, i) => (
                <li key={i}>
                  <strong>{task.title}</strong>: {task.description}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardComponent;
