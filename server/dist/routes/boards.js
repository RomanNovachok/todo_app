"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Board_1 = __importDefault(require("../models/Board"));
const router = (0, express_1.Router)();
router.get('/search', async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            res.status(400).json({ message: 'Missing search query' });
            return;
        }
        const board = await Board_1.default.findOne({ id: query });
        if (!board) {
            res.status(404).json({ message: 'Board not found' });
            return;
        }
        res.json(board);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const board = await Board_1.default.findOne({ id: req.params.id });
        if (!board) {
            res.status(404).json({ message: 'Board not found' });
            return;
        }
        res.json(board);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/', async (req, res) => {
    try {
        const { id, name } = req.body;
        const newBoard = new Board_1.default({
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
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBoard = await Board_1.default.findOneAndDelete({ id });
        if (!deletedBoard) {
            res.status(404).json({ message: 'Board not found' });
            return;
        }
        res.status(200).json({ message: 'Board deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedBoard = await Board_1.default.findOneAndUpdate({ id }, updatedData, { new: true });
        if (!updatedBoard) {
            res.status(404).json({ message: 'Board not found' });
            return;
        }
        res.status(200).json(updatedBoard);
    }
    catch (err) {
        console.error('PUT /:id error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
