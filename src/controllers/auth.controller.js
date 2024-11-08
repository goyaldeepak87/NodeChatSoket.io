const httpStatus = require('http-status');
const { userService, authService } = require("../services");
const catchAsync = require("../utils/catchAsync")

const register = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.status.CREATED).send({ user });
})

const login = catchAsync(async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password)
    const user = await authService.loginUserWithEmailAndPassword(email, password)
    // const user = await userService.createUser(req.body);
    res.status(httpStatus.status.CREATED).send({ user });
})

module.exports = { register, login }