const Images = require("../../api/v1/images/model");
const { NotFound } = require("../../errors");

const createImage = async (req) => {
    const result = await Images.create({
        name: req.file
            ? `uploads/${req.file.filename}`
            : `uploads/avatar/default.png`,
    });

    return result;
};

const checkingImage = async (id) => {
    const result = await Images.findById(id);
    if (!result) {
        throw new NotFound(`Tidak ada gambar dengan id: ${id}`);
    }

    return result;
};

module.exports = { createImage, checkingImage };
