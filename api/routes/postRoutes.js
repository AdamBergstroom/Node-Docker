const express = require("express")

const postController = require("../controllers/postController")
const checkAuthorization = require("../middleware/authMiddleware")

const router = express.Router()

// localhost:3000/api/v1/posts/
router
    .route("/")
    .get(checkAuthorization, postController.getAllPosts)
    .post(checkAuthorization, postController.createPost)

// localhost:3000/api/v1/posts/:id
router
    .route("/:id")
    .get(checkAuthorization, postController.getOnePost)
    .patch(checkAuthorization, postController.updatePost)
    .delete(checkAuthorization, postController.deletePost)

module.exports = router