const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./_middleware/error-handler");
const morgan = require("morgan");
const http = require("http");
const path = require('path');
global.appRoot = path.resolve(__dirname);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  console.log(JSON.stringify(req.headers));
  next();
});
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("combined"));
app.set("view engine", "ejs");
// api routes
app.use("/users", require("./users/users.controller"));
app.use("/questions", require("./questions/question.controller"));
app.use("/categories", require("./categories/categories.controller"));
app.use("/exams", require("./exams/exam.controller"));
app.use("/results", require("./results/result.controller"));
app.use("/games", require("./games/games.controller"));
app.use("/reading", require("./reading/reading.controller"));
app.use("/groups", require("./groups/groups.controller"));

app.disable("etag");
// process.on('uncaughtException', function (err) {
//
//     console.log("caughtException but no error msg" + err.stack);
//
// });
// process.on('unhandledRejection', (reason, promise) => {
//     // console.log('Unhandled Promise Rejection:', reason);
//     process.exit(1);
// });
// process.on('exit', (code) => {
//     console.log(`Process exited with code ${code}`);
// });
//
// process.on('error', (err) => {
//     // Log the error to the terminal
//     console.error('Error:', err);
//     // Optionally, you can perform additional error handling tasks here
// });
// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT || 8888;
app.listen(port, () => console.log("Server listening on port == " + port));
