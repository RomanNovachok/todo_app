import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDB } from './db';
import boardsRouter from './routes/boards';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve("build")));

app.get('/', (_req, res) => {
  res.sendFile(path.resolve("build", "index.html"));
});

app.use('/api/boards', boardsRouter);

connectToDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
