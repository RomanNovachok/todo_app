import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

type Task = {
  title: string;
  description: string;
};

type Board = {
  id: string;
  name: string;
  columns: Record<string, Task[]>;
};

type Props = {
  onCreate: (board: Board) => void;
};

const CreateBoardButton = ({ onCreate }: Props) => {
  const handleCreateBoard = async () => {
    const newBoard = {
      id: uuidv4(),
      name: "No Name",
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
