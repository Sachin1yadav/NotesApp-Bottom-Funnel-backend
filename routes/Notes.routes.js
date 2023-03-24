const express = require("express");
const { NoteModel } = require("../models/Notes.model");
const notesRouter = express.Router();

notesRouter.get("/", async (req, res) => {
  try {
    let data = await NoteModel.find(req.body);
    res.send(data);
  } catch {
    res.status(400).send("Unauthrorized user");
  }
});

notesRouter.post("/add", async (req, res) => {
  try {
    let newnote = new NoteModel(req.body);
    await newnote.save();
    res.send("done");
  } catch {
    res.status(400);
  }
});

notesRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const note = await NoteModel.find({ _id: id });
  const userID_in_note = note[0].userID;
  const userID_making_req = req.body.userID;

  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "You Are Not Authorised" });
    } else {
      await NoteModel.findByIdAndUpdate({ _id: id }, payload);
      res.send("updated the Note");
    }
  } catch (err) {
    res.send({ msg: "Something Went Wrong" });
  }
});

notesRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await NoteModel.findByIdAndDelete({ _id: id });
    res.send("Deleted the Note");
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something Went Wrong" });
  }
});

module.exports = {
  notesRouter,
};
