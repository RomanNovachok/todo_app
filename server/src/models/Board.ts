import { Schema, model } from 'mongoose';

const boardSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  columns: {
    type: Map,
    of: [new Schema({
      title: String,
      description: String
    }, { _id: false })]
  }
});

export default model('Board', boardSchema);
