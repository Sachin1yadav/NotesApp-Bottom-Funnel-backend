const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  userID: String,
  title: String,
  description: String,
  created: {
    type: String,
    default: ()=>new Date().toLocaleString(),
  },
});

const NoteModel = mongoose.model("note", noteSchema);

module.exports = {
  NoteModel,
};
