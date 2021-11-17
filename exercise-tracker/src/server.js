const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config(); // remove eventually
const routes = require(__dirname + "/routes");

app
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(express.static("public"))
  .use(routes);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
