import { Router, Request, Response } from 'express';
import Board from '../models/Board';

const router = Router();

router.get('/search', async (req: Request, res: Response): Promise<void> => {
    try {
      const query = req.query.query as string;
      if (!query) {
        res.status(400).json({ message: 'Missing search query' });
        return;
      }
      
      const board = await Board.findOne({
        $or: [
          { id: query },
          { name: { $regex: query, $options: 'i' } } // нечіткий пошук по назві
        ]
      });
  
      if (!board) {
        res.status(404).json({ message: 'Board not found' });
        return;
      }
  
      res.json(board);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
});
  

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
      const board = await Board.findOne({ id: req.params.id });
      if (!board) {
        res.status(404).json({ message: 'Board not found' });
        return;
      }
      res.json(board);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { id, name } = req.body;
    const newBoard = new Board({
      id,
      name,
      columns: {
        'ToDo': [],
        'InProgress': [],
        'Done': []
      }
    });
    await newBoard.save();
    res.status(201).json(newBoard);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }  
});

export default router;
