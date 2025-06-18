import axios from 'axios';

type Props = {
  board: {
    id: string;
    name: string;
  } | null;
  onBoardDeleted: (board: null, reason?: string) => void;
};

const DeleteBoardButton = ({ board, onBoardDeleted }: Props) => {
  const handleDelete = async () => {
    if (!board) {
      alert("No board is currently loaded.");
      return;
    }

    const confirmed = window.confirm(`Are you sure you want to delete the board "${board.name}"?`);

    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/boards/${board.id}`);
      onBoardDeleted(null, 'deleted');
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  return <button onClick={handleDelete}>Delete Board</button>;
};

export default DeleteBoardButton;
