const Events = require("../../api/v1/events/model");
const { checkingImage } = require("./images");
const { checkingCategories } = require("./categories");
const { checkingTalents } = require("./talents");

// import custom error not found dan bad request
const { NotFound, BadRequest } = require("../../errors");

const getAllEvents = async (req) => {
    const { keyword, category, talent } = req.query;
    let condition = { organizer: req.user.organizer };

    if (keyword) {
        condition = { ...condition, title: { $regex: keyword, $options: "i" } };
    }

    if (category) {
        condition = { ...condition, category: category };
    }

    if (talent) {
        condition = { ...condition, talent: talent };
    }

    const result = await Events.find(condition)
        .populate({ path: "image", select: "_id name" })
        .populate({ path: "category", select: "_id name" })
        .populate({
            path: "talent",
            select: "_id name role image",
            populate: { path: "image", select: "_id name" },
        });

    return result;
};

const createEvents = async (req) => {
    const {
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent,
    } = req.body;

    // cari image, category dan talent dengan field id
    await checkingImage(image);
    await checkingCategories(category);
    await checkingTalents(talent);

    // cari event dengan field name
    const check = await Events.findOne({ title });

    // apabila check true / data events sudah ada maka kita tampilkan error bad request dengan message pembicara duplikasi
    if (check) throw new BadRequest("Judul event sudah ada");

    const result = await Events.create({
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent,
        organizer: req.user.organizer,
    });

    return result;
};

const getOneEvents = async (req) => {
    const { id } = req.params;

    const result = await Events.findOne({
        _id: id,
        organizer: req.user.organizer,
    })
        .populate({ path: "image", select: "_id name" })
        .populate({ path: "category", select: "_id name" })
        .populate({
            path: "talent",
            select: "_id name role image",
            populate: { path: "image", select: "_id name" },
        });

    if (!result) {
        throw new NotFound(`Tidak ada event dengan id : ${id}`);
    }

    return result;
};

const updateEvent = async (req) => {
    const { id } = req.params;
    const {
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent,
    } = req.body;

    // cari image, category dan talent dengan field id
    await checkingImage(image);
    await checkingCategories(category);
    await checkingTalents(talent);

    const isAvailable = await Events.findOne({ _id: id });
    if (!isAvailable) throw new NotFound(`Tidak ada event dengan id : ${id}`);

    // cari event dengan field name
    const check = await Events.findOne({
        title,
        _id: { $ne: id },
        organizer: req.user.organizer,
    });

    // apabila check true / data events sudah ada maka kita tampilkan error bad request dengan message pembicara duplikasi
    if (check) throw new BadRequest("Judul event sudah ada");

    const result = await Events.findOneAndUpdate(
        { _id: id, organizer: req.user.organizer },
        {
            title,
            date,
            about,
            tagline,
            venueName,
            keyPoint,
            statusEvent,
            tickets,
            image,
            category,
            talent,
            organizer: req.user.organizer,
        },
        { new: true, runValidators: true }
    );

    return result;
};

const deleteEvents = async (req) => {
    const { id } = req.params;

    const result = await Events.findOne({
        _id: id,
        organizer: req.user.organizer,
    });

    if (!result) throw new NotFound(`Tidak ada event dengan id : ${id}`);

    await result.deleteOne();

    return result;
};

module.exports = {
    getAllEvents,
    getOneEvents,
    createEvents,
    deleteEvents,
    updateEvent,
};
