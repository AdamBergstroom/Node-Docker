// Store all env variables
// All env can be passed via docker-compose or locally in .env file.
module.exports = {
    MONGO_IP: process.env.MONGO_IP || "mongo", // will default to the dns name of the mongo container.
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
}