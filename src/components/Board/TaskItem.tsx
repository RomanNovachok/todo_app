// src/components/Board/TaskItem.tsx
import React, { useState } from 'react';
import { Task } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateBoard } from '../../store/boardSlice';

type Props = {
  task: Task;
  boardId: string;
  columnName: string;
};

const TaskItem = ({ task, boardId, columnName }: Props) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.board.currentBoard);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  if (!board) return null;

  const handleSave = () => {
    const updatedBoard = {
      ...board,
      columns: {
        ...board.columns,
        [columnName]: board.columns[columnName].map((t) =>
          t.id === task.id ? { ...t, title: editedTitle, description: editedDescription } : t
        ),
      },
    };

    dispatch(updateBoard(updatedBoard));
    setIsEditing(false);
  };

  const handleDelete = () => {
    const updatedBoard = {
      ...board,
      columns: {
        ...board.columns,
        [columnName]: board.columns[columnName].filter((t) => t.id !== task.id),
      },
    };

    dispatch(updateBoard(updatedBoard));
  };

  return (
    <li style={{ marginBottom: '10px' }}>
      {isEditing ? (
        <div>
          <input value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
          <textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <strong>{task.title}</strong>: {task.description}
          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
