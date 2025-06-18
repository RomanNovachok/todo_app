import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import Header from './components/Header/Header';
import BoardComponent from './components/Board/Board';
import { setBoard, clearBoard } from './store/boardSlice';
import { Board } from './types/types';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const board = useSelector((state: RootState) => state.board.currentBoard);
  const errorMessage = useSelector((state: RootState) => state.board.error);

  const handleBoardUpdate = (updatedBoard: Board) => {
    dispatch(setBoard(updatedBoard));
  };

  const handleSearchResult = (board: Board | null, reason?: string) => {
    if (board) {
      dispatch(setBoard(board));
    } else {
      dispatch(clearBoard());
    }
  
    if (reason === 'deleted') {
      dispatch(clearBoard());
    }
  };
  

  const handleCreateBoard = (board: Board) => {
    dispatch(setBoard(board));
  };

  return (
    <div>
      <Header board={board} onSearchResult={handleSearchResult} onCreateBoard={handleCreateBoard} />
      <BoardComponent board={board} errorMessage={errorMessage} onBoardUpdate={handleBoardUpdate} />
    </div>
  );
}

export default App;
