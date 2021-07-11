const checkAuthorization = (req, res, next) => {
    const { user } = req.session
    if (!user) {
        return res
            .status(401)
            .json({ status: "fail", message: "Unauthorized - user not logged in" })
    }
    req.user = user // move user object to req.user instead of accessing at req.session.user
    next()
}

module.exports = checkAuthorization