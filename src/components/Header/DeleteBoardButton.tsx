import axios from 'axios';

type Props = {
  boardId: string;
  onBoardDeleted: (board: null, reason?: string) => void;
};

const DeleteBoardButton = ({ boardId, onBoardDeleted }: Props) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/boards/${boardId}`);
      onBoardDeleted(null, 'deleted');
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  return <button onClick={handleDelete}>Delete Board</button>;
};

export default DeleteBoardButton;
