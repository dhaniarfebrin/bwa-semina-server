const nodemailer = require("nodemailer");
const { email, password } = require("../../config");
const Mustache = require("mustache");
const fs = require("fs");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: email,
        pass: password,
    },
});

const otpMail = async (email_user, data) => {
    try {
        let template = fs.readFileSync("app/views/email/otp.html", "utf8");

        let message = {
            from: email,
            to: email_user,
            subject: "Otp for registration is: ",
            html: Mustache.render(template, data),
        };

        return await transporter.sendMail(message);
    } catch (ex) {
        console.log(ex);
    }
};

module.exports = { otpMail };
