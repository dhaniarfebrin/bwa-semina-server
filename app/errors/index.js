const CustomAPIError = require("./custom-api-error");
const BadRequest = require("./bad-request");
const NotFound = require("./not-found");
const UnauthorizedError = require("./unauthorized");
const UnauthenticatedError = require("./unauthenticated");

module.exports = {
    CustomAPIError,
    BadRequest,
    NotFound,
    UnauthenticatedError,
    UnauthorizedError,
};
