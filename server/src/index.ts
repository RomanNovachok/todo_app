import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDB } from './db';
import boardsRouter from './routes/boards';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Server is working!');
});

app.use('/api/boards', boardsRouter);

connectToDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
