const User = require("../models/User");
const mongoose = require("mongoose");

module.exports = {
  async list(req, res) {
    const arrayContainingAllUsers = await User.find();
    return res.send(arrayContainingAllUsers);
  },

  async create(req, res) {
    const newUser = req.body;
    const createdUser = (await User.create(newUser)).toJSON();
    return res.send(createdUser);
  },

  async addExercise(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
      return res.send("Invalid ID");
    }

    let userData = await User.findById(req.params._id);
    if (userData === null) {
      return res.send("Can't find user");
    }

    // doesn't deal with bad input

    let { description, duration, date } = req.body;

    if (date === "" || date === undefined) {
      date = Date.now();
    }
    date = new Date(date).toDateString();

    duration = Number(duration);

    let newExercise = {
      description: description,
      duration: duration,
      date: date,
    };

    userData.exercises.push(newExercise);
    userData.save();

    let newExerciseResponse = {
      _id: userData._id,
      username: userData.username,
      description: newExercise.description,
      duration: newExercise.duration,
      date: newExercise.date,
    };

    return res.send(newExerciseResponse);
  },

  async logs(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
      return res.send("Invalid ID");
    }

    let userData = await User.findById(req.params._id);
    if (userData === null) {
      return res.send("Can't find user");
    }

    let { from = new Date(0), to = new Date(), limit = 50 } = req.query;

    let queriedLogs = userData.exercises.filter(
      (exercise) =>
        new Date(exercise.date).getTime() >= new Date(from).getTime() &&
        new Date(exercise.date) <= new Date(to).getTime()
    );

    limit = Number(limit);
    retrievedLogs = queriedLogs.slice(0, limit);

    for (let k = 0; k < retrievedLogs.length; k++) {
      retrievedLogs[k].date = retrievedLogs[k].date.toString();
    }

    let queriedResponse = {
      username: userData.username,
      count: retrievedLogs.length,
      _id: userData._id,
      log: retrievedLogs,
    };

    return res.send(queriedResponse);
  },
};
