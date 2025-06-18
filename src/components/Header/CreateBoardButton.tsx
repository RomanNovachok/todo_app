import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type BoardResponse = {
    id: string;
    name: string;
    columns: {
      [key: string]: {
        title: string;
        description: string;
      }[];
    };
  };

const CreateBoardButton = () => {
    const navigate = useNavigate();

    const handleCreateBoard = async ( ) => {
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
            const res = await axios.post<BoardResponse>("http://localhost:5000/api/boards", newBoard);
            console.log("Board created:", res.data);
            navigate(`/boards/${res.data.id}`);
        } catch (err) {
        console.error("Error creating board:", err);
        }
    };

    return (
        <button onClick={handleCreateBoard}>
        Create New Board
        </button>
    );
};

export default CreateBoardButton;
