// const mongoose = require('mongoose');
const httpStatus = require('http-status');
// const config = require('../config/config');
// const logger = require('../config/logger');
// const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  res.locals.errorMessage = err.message;
  console.log("statusCode", statusCode, message)
  const response = {
    code: statusCode,
    message,
  };

  res.status(statusCode).send(response);
};

module.exports = {
  errorHandler
};
