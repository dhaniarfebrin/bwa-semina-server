const Users = require("../../api/v1/users/model");
const { BadRequest, UnauthorizedError } = require("../../errors");
const { createTokenUser, createJWT } = require("../../utils");

const signIn = async (req) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequest("Please provide email and password");
    }

    const result = await Users.findOne({ email });
    if (!result) {
        throw new BadRequest("Invalid email or password");
    }

    const isPasswordCorrect = await result.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new BadRequest("Invalid email or password");
    }

    const token = createJWT({ payload: createTokenUser(result) });

    return token;
};

module.exports = { signIn };
