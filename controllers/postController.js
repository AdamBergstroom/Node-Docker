const Post = require("../models/postModel")

exports.getAllPosts = async(req, res, next) => {
        try {
            const posts = await Posts.find()
            res.status(200).json({
                status: "success",
                results: posts.length,
                data: {
                    posts,
                },
            })
        } catch (error) {
            res.status(400).json({
                status: "fail",
            })
        }
    }
    // STOPPED AT 2.40.00
exports.getOnePost = async(req, res, next) => {
    try {
        const post = await Posts.findById(req.params.id)
        res.status(200).json({
            status: "success",
            data: {
                post,
            },
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
        })
    }
}