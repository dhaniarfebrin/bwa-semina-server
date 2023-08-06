const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    urlDb: process.env.URL_MONGODB_DEV,
    jwtExpiration: "10m",
    jwtRefreshExpiration: "24h",
    jwtSecret: process.env.SECRET_TOKEN,
};
