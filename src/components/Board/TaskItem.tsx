import React, { useState } from 'react';
import { Task, Board } from '../../types/types';
import axios from 'axios';

type Props = {
  task: Task;
  boardId: string;
  columnName: string;
  onBoardUpdate: (updatedBoard: Board) => void;
};

const TaskItem = ({ task, boardId, columnName, onBoardUpdate }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSave = async () => {
    try {
      const res = await axios.get<Board>(`/api/boards/${boardId}`);
      const updatedBoard = { ...res.data };

      updatedBoard.columns[columnName] = updatedBoard.columns[columnName].map((t) =>
        t.id === task.id ? { ...t, title: editedTitle, description: editedDescription } : t
      );

      const putRes = await axios.put<Board>(`/api/boards/${boardId}`, updatedBoard);
      onBoardUpdate(putRes.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Error editing task:', err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.get<Board>(`/api/boards/${boardId}`);
      const updatedBoard = { ...res.data };

      updatedBoard.columns[columnName] = updatedBoard.columns[columnName].filter(
        (t) => t.id !== task.id
      );

      const putRes = await axios.put<Board>(`/api/boards/${boardId}`, updatedBoard);
      onBoardUpdate(putRes.data);
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <li style={{ marginBottom: '10px' }}>
      {isEditing ? (
        <div>
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
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
