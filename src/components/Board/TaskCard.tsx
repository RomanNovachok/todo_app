import React from 'react';
import { Board, Task } from '../../types/types';
import AddTaskForm from './AddTaskForm';
import TaskItem from './TaskItem';

type Props = {
  columnName: string;
  tasks: Task[];
  boardId: string;
  onBoardUpdate: (updatedBoard: Board) => void;
};

const TaskCard = ({ columnName, tasks, boardId, onBoardUpdate }: Props) => {
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
            onBoardUpdate={onBoardUpdate}
          />
        ))}
      </ul>
      {columnName === 'ToDo' && (
        <AddTaskForm boardId={boardId} columnName={columnName} onBoardUpdate={onBoardUpdate} />
      )}
    </div>
  );
};

export default TaskCard;
