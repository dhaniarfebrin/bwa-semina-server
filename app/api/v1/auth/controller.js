const { signIn } = require("../../../services/mongoose/auth");

const { StatusCodes } = require("http-status-codes");

const signinCMS = async (req, res, next) => {
    try {
        const result = await signIn(req);

        res.status(StatusCodes.CREATED).json({
            data: { token: result },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { signinCMS };
