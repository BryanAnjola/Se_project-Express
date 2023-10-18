const express = require("express");
const errorHandler = require("./middlewares/error-handler");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
//app.js

const { requestLogger, errorLogger } = require("./middlewares/logger");
const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const routes = require("./routes");

app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
// app.use(errorHandler);
// //app.use((err, req, res, next) => {
//   res.status(500).send({ message: 'An error occurred on the server' });
// });
app.listen(PORT, () => {
  console.log(`App listening at ${PORT}`);
  console.log("this is still 
working");
});
