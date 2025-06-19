import React from 'react';
import { Task } from '../../types/types';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import { Droppable } from '@hello-pangea/dnd';
import './styles/taskcard.css';

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
          className="column"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="column-header">{columnName}</div>
          <ul className="task-list">
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
            <div className="add-task-area">
              <AddTaskForm boardId={boardId} columnName={columnName} />
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default TaskCard;
