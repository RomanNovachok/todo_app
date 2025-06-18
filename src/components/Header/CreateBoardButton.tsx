import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Board, Task } from '../../types/types';

type Props = {
  onCreate: (board: Board) => void;
};

const CreateBoardButton = ({ onCreate }: Props) => {
  const handleCreateBoard = async () => {
    const newBoard: Board = {
      id: uuidv4(),
      name: 'No Name',
      columns: {
        ToDo: [],
        InProgress: [],
        Done: [],
      },
    };

    try {
      const res = await axios.post<Board>("http://localhost:5000/api/boards", newBoard);
      onCreate(res.data); 
    } catch (err) {
      console.error("Error creating board:", err);
    }
  };

  return <button onClick={handleCreateBoard}>Create New Board</button>;
};

export default CreateBoardButton;
