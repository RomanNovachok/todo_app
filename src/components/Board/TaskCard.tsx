// src/components/Board/TaskCard.tsx
import React from 'react';
import { Task } from '../../types/types';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import { Droppable } from '@hello-pangea/dnd';

type Props = {
  columnName: string;
  tasks: Task[];
  boardId: string;
};

const TaskCard = ({ columnName, tasks, boardId }: Props) => {
  return (
    <Droppable droppableId={columnName}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            width: '300px',
            minHeight: '200px',
            backgroundColor: '#f4f4f4',
          }}
        >
          <h3>{columnName}</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {tasks.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                boardId={boardId}
                columnName={columnName}
                index={index} 
              />
            ))}
            {provided.placeholder}
          </ul>

          {columnName === 'ToDo' && (
            <div style={{ marginTop: '10px' }}>
              <AddTaskForm boardId={boardId} columnName={columnName} />
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default TaskCard;
