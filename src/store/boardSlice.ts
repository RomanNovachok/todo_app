// src/store/boardSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../api/axiosInstance';
import { Board } from '../types/types';

interface BoardState {
  currentBoard: Board | null;
  loading: boolean;
  error: string | null;
}

const initialState: BoardState = {
  currentBoard: null,
  loading: false,
  error: null,
};

export const fetchBoardById = createAsyncThunk(
  'board/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/boards/${id}`);
      return response.data as Board;
    } catch (err: any) {
      return rejectWithValue('Board not found or invalid ID');
    }
  }
);

export const updateBoard = createAsyncThunk(
  'board/update',
  async (board: Board, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/boards/${board.id}`, board);
      return response.data as Board;
    } catch (err: any) {
      return rejectWithValue('Failed to update board');
    }
  }
);

export const createBoard = createAsyncThunk(
    'board/create',
    async (board: Board, { rejectWithValue }) => {
      try {
        const response = await axios.post('/api/boards', board);
        return response.data as Board;
      } catch (err) {
        return rejectWithValue('Failed to create board');
      }
    }
  );
  
  export const deleteBoardById = createAsyncThunk(
    'board/delete',
    async (id: string, { rejectWithValue }) => {
      try {
        await axios.delete(`/api/boards/${id}`);
        return id;
      } catch (err) {
        return rejectWithValue('Failed to delete board');
      }
    }
  );
  

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    clearBoard: (state) => {
      state.currentBoard = null;
      state.error = null;
    },
    setBoard: (state, action: PayloadAction<Board>) => {
      state.currentBoard = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
      builder
      .addCase(deleteBoardById.fulfilled, (state) => {
        state.currentBoard = null;
        state.error = null;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.currentBoard = action.payload;
        state.error = null;
      })
      .addCase(fetchBoardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBoard = action.payload;
      })
      .addCase(fetchBoardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.currentBoard = null;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.currentBoard = action.payload;
      });
  },
});

export const { clearBoard, setBoard } = boardSlice.actions;

export default boardSlice.reducer;
