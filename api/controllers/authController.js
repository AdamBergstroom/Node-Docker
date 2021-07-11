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
        req.session.user = newUser
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
            // Now we work with Redis sessions.
            // step 1: assign user to a session.
            // ste 2: login and see details about the session in redis - docker exec -it node-docker_redis_1 redis cli - then - Keys * - to see all current sessions - then - GET [session key] - to see the details there of user object.
            req.session.user = user

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