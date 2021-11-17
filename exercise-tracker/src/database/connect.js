const mongoose = require("mongoose");

let dbLog = "database connect:";
mongoose
  .connect(process.env["MONGO_URI"], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`${dbLog} success`))
  .catch((err) => console.error(`${dbLog} error`));

module.exports = mongoose;
