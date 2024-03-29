const Categories = require("../../api/v1/categories/model");
const { NotFound, BadRequest } = require("../../errors");

const getAllCategories = async (req) => {
    const result = await Categories.find({ organizer: req.user.organizer });

    return result;
};

const createCategories = async (req) => {
    const { name } = req.body;

    const check = await Categories.findOne({
        name,
        organizer: req.user.organizer,
    });
    if (check) {
        throw new BadRequest("Kategori sudah ada");
    }

    const result = await Categories.create({
        name,
        organizer: req.user.organizer,
    });

    return result;
};

const getOneCategories = async (req) => {
    const { id } = req.params;
    const result = await Categories.findOne({
        _id: id,
        organizer: req.user.organizer,
    });

    if (!result) throw new NotFound(`Tidak ada Kategori dengan id: ${id}`);

    return result;
};

const updateCategories = async (req) => {
    const { id } = req.params;
    const { name } = req.body;

    const isAvailable = await Categories.findOne({
        _id: id,
        organizer: req.user.organizer,
    });
    if (!isAvailable) {
        throw new NotFound(`Tidak ada kategori dengan id: ${id}`);
    }

    const check = await Categories.findOne({
        name,
        organizer: req.user.organizer,
        _id: { $ne: id },
    });

    if (check) throw new BadRequest("Nama Kategori sudah ada");

    const result = await Categories.findByIdAndUpdate(
        id,
        { name },
        { new: true, runValidators: true }
    );

    return result;
};

const deleteCategories = async (req) => {
    const { id } = req.params;
    const result = await Categories.findOne({
        _id: id,
        organizer: req.user.organizer,
    });

    if (!result) {
        throw new NotFound(`Tidak ada kategori dengan id: ${id}`);
    }

    await result.deleteOne();

    return result;
};

const checkingCategories = async (id) => {
    const result = await Categories.findById(id);

    if (!result) throw new NotFound(`Tidak ada kategori dengan id : ${id}`);

    return result;
};

module.exports = {
    getAllCategories,
    createCategories,
    getOneCategories,
    updateCategories,
    deleteCategories,
    checkingCategories,
};
