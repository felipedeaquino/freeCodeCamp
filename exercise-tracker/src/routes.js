const express = require("express");
const routes = express.Router();
const UserControllers = require("./controllers/UserControllers");

routes.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

routes
  .route("/api/users")
  .get(UserControllers.list)
  .post(UserControllers.create);

routes.post("/api/users/:_id/exercises", UserControllers.addExercise);

routes.get("/api/users/:_id/logs", UserControllers.logs);

module.exports = routes;
