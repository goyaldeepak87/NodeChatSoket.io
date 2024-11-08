const express = require("express");
const { authcontrolar } = require("../controllers");
const { authvalidation } = require("../validations");
const { validate } = require("../middlewares/validate");

const router = express.Router()

router.post("/register", validate(authvalidation.register), authcontrolar.register)
router.post("/login", validate(authvalidation.login), authcontrolar.login)


module.exports = router;
  