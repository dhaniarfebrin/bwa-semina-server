// import model Talents
const Talents = require("../../api/v1/talents/model");
const { checkingImage } = require("./images");

// import custom error not found dan bad request
const { NotFound, BadRequest } = require("../../errors");

const getAllTalents = async (req) => {
    const { keyword } = req.query;

    let condition = {};

    if (keyword) {
        condition = { ...condition, name: { $regex: keyword, $options: "i" } };
    }

    const result = await Talents.find(condition)
        .populate({ path: "image", select: "_id name" })
        .select("_id name role image");

    return result;
};

const createTalents = async (req) => {
    const { name, role, image } = req.body;

    // cari image dengan field image
    await checkingImage(image);

    // cari talents dengan field name
    const check = await Talents.findOne({ name });

    // apabila check true / data talents sudah ada maka kita tampilkan error bad request dengan message pembicara duplikasi
    if (check) throw new BadRequest("Pembicara sudah terdaftar");

    const result = await Talents.create({ name, image, role });

    return result;
};

const getOneTalents = async (req) => {
    const { id } = req.params;

    const result = await Talents.findById(id)
        .populate({ path: "image", select: "_id name" })
        .select("_id name role image");

    if (!result) {
        throw new NotFound(`Tidak ada pembicara dengan id : ${id}`);
    }

    return result;
};

const updateTalents = async (req) => {
    const { id } = req.params;
    const { name, image, role } = req.body;

    // cari image daengan field image
    await checkingImage(image);

    const isAvailable = await Talents.findById(id)
    // jika id result false / null maka akan menampilkan error 'Tidak ada pembicara dengan id' yang dikirim client
    if (!isAvailable) {
        throw new NotFound(`Tidak ada pembicara dengan id : ${id}`);
    }

    // cari talents dengan field name dan id selain dari yang dikirim dari params
    const check = await Talents.findOne({
        name,
        _id: { $ne: id },
    });

    // apabila check true / data talents sudah ada maka kita tampilkan error bad request dengan message pembicara nama duplikat
    if (check) {
        throw new BadRequest("pembicara sudah terdaftar");
    }

    const result = await Talents.findByIdAndUpdate(
        id,
        { name, image, role },
        { new: true, runValidators: true }
    );


    return result;
};

const deleteTalent = async (req) => {
    const { id } = req.params;

    const result = await Talents.findById(id);

    if (!result) {
        throw new NotFound(`Tidak ada pembicara dengan id : ${id}`);
    }

    await result.deleteOne();

    return result;
};

const checkingTalents = async (id) => {
    const result = await Talents.findById(id);

    if (!result) {
        throw new NotFound(`Tidak ada pembicara dengan id : ${id}`);
    }

    return result;
};

module.exports = {
    getAllTalents,
    createTalents,
    getOneTalents,
    updateTalents,
    deleteTalent,
    checkingTalents,
};
