// src/components/Board/AddTaskForm.tsx
import React, { useState } from 'react';
import { Task } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateBoard } from '../../store/boardSlice';

type Props = {
  boardId: string;
  columnName: string;
};

const AddTaskForm = ({ boardId, columnName }: Props) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.board.currentBoard);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!board) return null;

  const handleAdd = () => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      status: columnName as 'ToDo', // або типізувати загалом
    };

    const updatedBoard = {
      ...board,
      columns: {
        ...board.columns,
        [columnName]: [...board.columns[columnName], newTask],
      },
    };

    dispatch(updateBoard(updatedBoard));
    setTitle('');
    setDescription('');
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
};

export default AddTaskForm;
