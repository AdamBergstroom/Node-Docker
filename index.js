const express = require("express")
const mongoose = require("mongoose")
const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT,
} = require("./config/config")

const postRouter = require("./routes/postRoutes")

const app = express()

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

// Making sure mongo-db is started before connecting.
// docker could be delayed with setting it up.
const connectWithRetry = () => {
    mongoose
        .connect(mongoURL, {
            // optional. Will remove some warnings when connecting to mongo-db
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        .then(() => console.log("Successfully connected to mongo-db"))
        .catch((error) => {
            console.log(`Could not connect to mongo-db\nError: ${error}`)
            setTimeout(connectWithRetry, 5000)
        })
}

connectWithRetry()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("<h2>Hello World</h2>")
})

// localhost:3000/api/v1/posts
app.use("/api/v1/posts", postRouter)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}`))