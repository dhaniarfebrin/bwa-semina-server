const { default: mongoose } = require("mongoose");
const { model, Schema } = mongoose;
const bcrypt = require("bcryptjs");

let userSchema = Schema(
    {
        name: {
            type: String,
            minlength: [3, "Panjang nama minimal 3 karakter"],
            maxlength: [50, "Panjang nama maximal 50 karakter"],
            required: [true, "Nama harus diisi"],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Nama harus diisi"],
        },
        password: {
            type: String,
            required: [true, "Password harus diisi"],
            minlength: 6,
        },
        role: {
            type: String,
            enum: ["admin", "organizer", "owner"],
            default: "admin",
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: "Organizers",
            required: true,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    const User = this;
    if (User.isModified("password")) {
        User.password = await bcrypt.hash(User.password, 12);
    }
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

module.exports = model("Users", userSchema);
