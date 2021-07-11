const express = require("express")

const authController = require("../controllers/authController")

const router = express.Router()

// localhost:3000/api/v1/users/signup
router.post("/signup", authController.signUp)

// localhost:3000/api/v1/users/login
router.post("/login", authController.login) // adambergstrom91 1234

module.exports = router