// src/components/Board/TaskCard.tsx
import React from 'react';
import { Task } from '../../types/types';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';

type Props = {
  columnName: string;
  tasks: Task[];
  boardId: string;
};

const TaskCard = ({ columnName, tasks, boardId }: Props) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', width: '300px' }}>
      <h3>{columnName}</h3>
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            boardId={boardId}
            columnName={columnName}
          />
        ))}
      </ul>
      {columnName === 'ToDo' && (
        <AddTaskForm boardId={boardId} columnName={columnName} />
      )}
    </div>
  );
};

export default TaskCard;
