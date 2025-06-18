import React, { useState } from 'react';
import { Task, Board } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

type Props = {
  boardId: string;
  columnName: string;
  onBoardUpdate: (updatedBoard: Board) => void;
};

const AddTaskForm = ({ boardId, columnName, onBoardUpdate }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = async () => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      status: columnName as 'ToDo',
    };

    try {
      const res = await axios.get<Board>(`/api/boards/${boardId}`);
      const updatedBoard = { ...res.data };
      updatedBoard.columns[columnName].push(newTask);

      const putRes = await axios.put<Board>(`/api/boards/${boardId}`, updatedBoard);
      onBoardUpdate(putRes.data);

      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
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
