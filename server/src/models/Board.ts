import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  status: { type: String, required: true }
}, { _id: false });

const boardSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  columns: {
    type: Map,
    of: [taskSchema]
  }
});

export default model('Board', boardSchema);
