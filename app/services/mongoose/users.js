const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizers/model");

const { NotFound, BadRequest } = require("../../errors");

const createOrganizer = async (req) => {
    const { organizer, email, password, confirmPassword, name, role } =
        req.body;

    if (password !== confirmPassword) {
        throw new BadRequest("Password tidak cocok");
    }

    const result = await Organizers.create({ organizer });

    const users = await Users.create({
        email,
        name,
        password,
        role,
        organizer: result._id,
    });

    delete users._doc.password;

    return users;
};

module.exports = { createOrganizer };
