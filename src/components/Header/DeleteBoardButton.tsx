import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteBoardById } from '../../store/boardSlice';
import './header.css'; 

const DeleteBoardButton = () => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.board.currentBoard);

  const handleDelete = () => {
    if (!board) {
      alert("No board is currently loaded.");
      return;
    }

    const confirmed = window.confirm(`Are you sure you want to delete the board "${board.name}"?`);
    if (!confirmed) return;

    dispatch(deleteBoardById(board.id)); 
  };

  return <button onClick={handleDelete}>Delete Board</button>;
};

export default DeleteBoardButton;
