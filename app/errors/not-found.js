const { StatusCodes } = require("http-status-code");
const CustomAPIError = require("./custom-api-error");

class NotFound extends CustomAPIError {
    constructor(message) {
        super(message);

        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFound;
