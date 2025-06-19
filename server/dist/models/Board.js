"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    status: { type: String, required: true }
}, { _id: false });
const boardSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    columns: {
        type: Map,
        of: [taskSchema]
    }
});
exports.default = (0, mongoose_1.model)('Board', boardSchema);
