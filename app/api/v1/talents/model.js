const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let talentSchema = Schema(
    {
        name: {
            type: String,
            required: [true, "Nama harus diisi"],
        },
        role: {
            type: String,
            default: "-",
        },
        // untuk membuat relasi pad amongodb kita perlu membuat types ObjectID
        image: {
            type: mongoose.Types.ObjectId,
            ref: "Images",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = model("Talents", talentSchema);
