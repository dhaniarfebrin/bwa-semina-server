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

const createUsers = async (req, res) => {
    const { name, password, role, confirmPassword, email } = req.body;

    if (password !== confirmPassword) {
        throw new BadRequest("Password tidak sama");
    }

    const result = await Users.create({
        name,
        email,
        organizer: req.user.organizer,
        password,
        role,
    });

    return result;
};

module.exports = { createOrganizer, createUsers };
