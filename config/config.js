// Store all env variables
// All env can be passed via docker-compose or locally in .env file.
module.exports = {
    MONGO_IP: process.env.MONGO_IP || "mongo", // will default to the dns name of the mongo container.
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    REDIS_URL: process.env.REDIS_URL || "redis", // will default to the dns name of redis in docker-compose file.
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    SESSION_SECRET: process.env.SESSION_SECRET,
}