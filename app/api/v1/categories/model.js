const { default: mongoose } = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = Schema(
    {
        name: {
            type: String,
            minlength: [3, "Panjang nama kategori minimal 3 karakter"],
            maxlength: [20, "Panjang nama kategori maximal 20 karakter"],
            required: [true, "Nama kategori harus diisi"],
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: "Organizers",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = model("Category", categorySchema);
