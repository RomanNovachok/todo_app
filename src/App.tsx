import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Header from './components/Header/Header';
import BoardComponent from './components/Board/Board';
import './main.css'; 


function App() {
  const board = useSelector((state: RootState) => state.board.currentBoard);
  const errorMessage = useSelector((state: RootState) => state.board.error);

  return (
    <div className='app-container'>
      <Header/>
      <BoardComponent/>
    </div>
  );
}

export default App;
