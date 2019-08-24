const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['Concluído', 'Em Andamento', 'Stand By'] },
  priority: { type: Number, default: 4, enum: [1, 2, 3, 4] },
  description: String,
  eventID: { type: Schema.Types.ObjectId, ref: 'Event' },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
