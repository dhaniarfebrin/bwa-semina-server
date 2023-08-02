const { StatusCodes } = require("http-status-code");
const CustomAPIError = require("./custom-api-error");

class BadRequest extends CustomAPIError {
    constructor(message) {
        super(message);

        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = BadRequest;
