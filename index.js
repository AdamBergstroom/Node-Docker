const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT,
    REDIS_URL,
    REDIS_PORT,
    SESSION_SECRET,
} = require("./config/config")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const session = require("express-session")
const redis = require("redis")
let RedisStore = require("connect-redis")(session)
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
})

const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")

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

app.enable("trust proxy") // enable proxy settings for this api where nginx is communicating.
app.use(cors({})) // enable cors so frontend can have a different dns then this api. It will reject if not the same dns name otherwise.
    // Connect Redis
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: SESSION_SECRET,
        cookie: {
            secure: false,
            resave: false,
            saveUninitialized: false,
            httpOnly: true, // only javascript can access it.
            maxAge: 300000, // milliseconds how long session will last (5 min now)
        },
    })
)

// Allow json objects to be sent.
app.use(express.json())

app.get("/api/v1", (req, res) => {
    res.send("<h2>Hello World!</h2>")
})

// localhost:3000/api/v1/posts
app.use("/api/v1/posts", postRouter)

// localhost:3000/api/v1/users
app.use("/api/v1/users", userRouter)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}`))