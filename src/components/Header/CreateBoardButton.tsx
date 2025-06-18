import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../../store/hooks';
import { createBoard } from '../../store/boardSlice';
import { Board } from '../../types/types';

const CreateBoardButton = () => {
  const dispatch = useAppDispatch();

  const handleCreateBoard = () => {
    const newBoard: Board = {
      id: uuidv4(),
      name: 'No Name',
      columns: {
        ToDo: [],
        InProgress: [],
        Done: [],
      },
    };

    dispatch(createBoard(newBoard));
  };

  return <button onClick={handleCreateBoard}>Create New Board</button>;
};

export default CreateBoardButton;
