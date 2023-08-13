const mongoose = require("mongoose");

const paymentSchmea = new mongoose.Schema(
    {
        type: {
            type: String,
            required: [true, "Tipe pembayaran harus diisi"],
            minlength: 3,
            maxlength: 50,
        },
        image: {
            type: mongoose.Types.ObjectId,
            ref: "Images",
            required: true,
        },
        status: {
            type: Boolean,
            enum: [true, false],
            default: true,
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: "Organizers",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchmea);
