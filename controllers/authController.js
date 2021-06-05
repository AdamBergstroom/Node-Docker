const User = require("../models/userModel")
const bcrypt = require("bcryptjs")

exports.signUp = async(req, res) => {
    try {
        const { username, password } = req.body
        const hashPassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({
            username,
            password: hashPassword,
        })
        res.status(201).json({
            status: "success",
            data: {
                user: newUser,
            },
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
        })
    }
}

exports.login = async(req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            res.status(404).json({
                status: "fail",
                message: "user not found",
            })
        }

        const isCorrect = await bcrypt.compare(password, user.password)
        if (isCorrect) {
            res.status(201).json({
                status: "success",
            })
        } else {
            res.status(400).json({
                status: "fail",
                message: "password does not match",
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
        })
    }
}