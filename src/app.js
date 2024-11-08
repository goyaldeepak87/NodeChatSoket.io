const express = require("express");
const router = require("./routes");
const { errorHandler } = require("./middlewares/error");
// const cors = require('cors');

const app = express()

// app.use(cors());
// app.options('*', cors());

app.use(express.json());

app.use("/v1", router)
 
app.use(errorHandler);
module.exports = app