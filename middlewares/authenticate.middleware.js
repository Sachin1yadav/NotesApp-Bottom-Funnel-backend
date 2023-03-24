const express = require("express");
const jwt = require("jsonwebtoken");

const NotesMiddlerware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "sachin", (err, data) => {
      if (data) {
        req.body = { ...req.body, userID: data.userID };
        next();
      }
      if (err) {
        res.status(400).send("Unauthorized user");
      }
    });
  } else {
    res.status(400).send("Unauthorized user");
  }
};

module.exports = {
  NotesMiddlerware,
};
