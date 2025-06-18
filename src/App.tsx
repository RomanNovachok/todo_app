import React, { useState } from 'react';
import Header from './components/Header/Header';
import BoardComponent from './components/Board/Board';
import { Board } from './types/types';

function App() {
  const [board, setBoard] = useState<Board | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleBoardUpdate = (updatedBoard: Board) => {
    setBoard(updatedBoard);
  };  

  const handleSearchResult = (board: Board | null, reason?: string) => {
    setBoard(board);
  
    if (reason === 'deleted') {
      setErrorMessage(null);
    } else if (board === null) {
      setErrorMessage("Boards with this ID do not exist, or you entered an incorrect ID.");
    } else {
      setErrorMessage(null); 
    }
  };

  const handleCreateBoard = (board: Board) => {
    setBoard(board);
    setErrorMessage(null);
  };

  const handleUpdateBoard = (updatedBoard: Board) => {
    setBoard(updatedBoard);
  };  

  return (
    <div>
      <Header board={board} onSearchResult={handleSearchResult} onCreateBoard={handleCreateBoard} />
      <BoardComponent board={board} errorMessage={errorMessage} onBoardUpdate={handleUpdateBoard}/>


    </div>
  );
}

export default App;
