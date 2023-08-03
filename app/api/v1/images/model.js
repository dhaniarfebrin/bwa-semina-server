const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let imageSchema = Schema(
    {
        name: { type: String },
    },
    { timestamp: true }
);

module.exports = model("Images", imageSchema);
