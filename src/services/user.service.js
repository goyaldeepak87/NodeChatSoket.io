const httpStatus = require("http-status")
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");

const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.status.BAD_REQUEST, 'Email already taken');
    }
    return User.create(userBody);
};

const getUserByEmail = async(email)=>{
  return User.findOne({email})
}

module.exports = {
    createUser,
    getUserByEmail
}