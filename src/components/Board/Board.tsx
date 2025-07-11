import React, { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateBoard } from '../../store/boardSlice';
import TaskCard from './TaskCard';
import { Board, Task } from '../../types/types';
import './styles/board.css';
import copyImage from '../../assets/images/copy-icon.svg'; 

const BoardComponent = () => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.board.currentBoard);
  const errorMessage = useAppSelector((state) => state.board.error);

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('');

  const handleBoardUpdate = (updatedBoard: Board) => {
    dispatch(updateBoard(updatedBoard));
  };

  const handleCopy = () => {
    if (board) navigator.clipboard.writeText(board.id);
  };

  const handleNameClick = () => {
    if (board) {
      setEditedName(board.name);
      setIsEditingName(true);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const saveBoardName = () => {
    if (board && editedName.trim() && editedName !== board.name) {
      handleBoardUpdate({ ...board, name: editedName.trim() });
    }
    setIsEditingName(false);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || !board) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const sourceTasks = Array.from(board.columns[sourceCol]);
    const destTasks = Array.from(board.columns[destCol]);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceCol === destCol) {
      sourceTasks.splice(destination.index, 0, movedTask);
      const updatedBoard: Board = {
        ...board,
        columns: {
          ...board.columns,
          [sourceCol]: sourceTasks,
        },
      };
      handleBoardUpdate(updatedBoard);
    } else {
      const updatedTask: Task = {
        ...movedTask,
        status: destCol as Task['status'],
      };

      destTasks.splice(destination.index, 0, updatedTask);

      const updatedBoard: Board = {
        ...board,
        columns: {
          ...board.columns,
          [sourceCol]: sourceTasks,
          [destCol]: destTasks,
        },
      };
      handleBoardUpdate(updatedBoard);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='board-container'>
        {!board && (
          <p className='board-status'>
            {errorMessage ? (
              <span>{errorMessage}</span>
            ) : (
              'No board loaded'
            )}
          </p>
        )}

        {board && (
          <>
            <div className="board-details-area">
              <div className='board-details-area-name'>
              {isEditingName ? (
                <input
                  value={editedName}
                  onChange={handleNameChange}
                  onBlur={saveBoardName}
                  onKeyDown={(e) => e.key === 'Enter' && saveBoardName()}
                  autoFocus
                />
              ) : (
                <h2 onClick={handleNameClick} style={{ cursor: 'pointer' }}>
                  Name: {board.name}
                </h2>
              )}
              </div>
              <div className="board-details-area-id">
                <h2>
                  Board ID: {board.id}{' '}
                  <button onClick={handleCopy}>
                    <img src={copyImage} alt="" />
                  </button>
                </h2>
              </div>
            </div>
            
            <div className='columns-container'>
              {Object.entries(board.columns).map(([columnName, tasks]) => (
                <TaskCard
                  key={columnName}
                  columnName={columnName}
                  tasks={tasks}
                  boardId={board.id}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </DragDropContext>
  );
};

export default BoardComponent;
