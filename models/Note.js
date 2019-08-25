const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  message: {
    type: String,
    required: true
  }
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
