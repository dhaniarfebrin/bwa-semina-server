const Categories = require("../../api/v1/categories/model");
const { NotFound } = require("../../errors");

const getAllCategories = async () => {
    const result = await Categories.find();

    return result;
};

const createCategories = async (req) => {
    const { name } = req.body;
    const result = await Categories.create({ name });

    return result;
};

const getOneCategories = async (req) => {
    const { id } = req.params;
    const result = await Categories.findOne({ _id: id });

    if (!result) throw new NotFound(`Tidak ada Kategori dengan id: ${id}`);

    return result;
};

module.exports = { getAllCategories, createCategories, getOneCategories };
