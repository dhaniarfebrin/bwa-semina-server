const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    urlDb: process.env.URL_MONGODB_DEV,
    jwtExpiration: "24h",
    jwtRefreshExpiration: "24h",
    jwtSecret: process.env.SECRET_TOKEN,
    email: process.env.EMAIL,
    password: process.env.EMAIL_PASSWORD,
};
