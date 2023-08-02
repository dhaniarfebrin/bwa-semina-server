const Categories = require("./model");
const { BadRequest } = require("../../../errors");

const {
    getAllCategories,
    createCategories,
    getOneCategories,
    updateCategories,
} = require("../../../services/mongoose/categories");

const create = async (req, res, next) => {
    try {
        const { name } = req.body;
        const check = await Categories.findOne({ name });
        if (check) {
            throw new BadRequest("Kategori sudah ada");
        }

        const result = await createCategories(req);

        res.status(201).json({
            data: result,
            message: "Category was created successfully",
        });
    } catch (err) {
        next(err);
    }
};

const index = async (req, res, next) => {
    try {
        // const result = await Categories.find().select("_id name");
        const result = await getAllCategories();

        res.status(200).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const find = async (req, res, next) => {
    try {
        const result = await getOneCategories(req);

        res.status(200).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await updateCategories(req);

        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Categories.findByIdAndRemove(id);
        res.status(200).json({ data: result });
    } catch (err) {
        next(err);
    }
};

module.exports = { create, index, find, update, destroy };
