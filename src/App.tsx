import React, { useState } from 'react';
import Header from './components/Header/Header';
import BoardComponent from './components/Board/Board';

type Task = {
  title: string;
  description: string;
};

type Board = {
  id: string;
  name: string;
  columns: Record<string, Task[]>;
};

function App() {
  const [board, setBoard] = useState<Board | null>(null);

  return (
    <div>
      <Header onSearchResult={setBoard} onCreateBoard={setBoard} />
      <BoardComponent board={board} />
    </div>
  );
}

export default App;
