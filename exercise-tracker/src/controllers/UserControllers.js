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

    let queryParameters = req.query;

    if (Object.keys(queryParameters).length === 0) {
      let logResponse = {
        username: userData.username,
        count: userData.exercises.length,
        _id: userData._id,
        log: userData.exercises,
      };
      return res.send(logResponse);
    }

    let retrievedLogs = [...userData.exercises];

    for (let item in queryParameters) {
      if (item === "from") {
        let fromTimestamp = new Date(queryParameters.from).getTime();
        for (let i = 0; i < retrievedLogs.length; i++) {
          let timestampExerciseDate = new Date(retrievedLogs[i].date).getTime();
          if (timestampExerciseDate < fromTimestamp) {
            retrievedLogs.splice(i, 1);
            i--;
          }
        }
      }

      if (item === "to") {
        let toTimestamp = new Date(queryParameters.to).getTime();
        for (let j = 0; j < retrievedLogs.length; j++) {
          let timestampExerciseDate = new Date(retrievedLogs[j].date).getTime();
          if (timestampExerciseDate > toTimestamp) {
            retrievedLogs.splice(j, 1);
            i--;
          }
        }
      }

      if (item === "limit") {
        let limit = Number(queryParameters.limit);
        retrievedLogs = retrievedLogs.slice(0, limit);
      }
    }

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
