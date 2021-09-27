const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "please enter your name"],
		},
		familyName: {
			type: String,
			required: [true, "please enter your familyname"],
		},
		email: {
			type: String,
			required: [true, "please enter an email adresse"],
			unique: true,
			validate: [isEmail, "please enter a valid email adresse"],
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			minLength: [6, "please enter a min 6 length password"],
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	salt = await bcrypt.genSalt(8);
	this.password = await bcrypt.hash(this.password, salt);
	next();
	// console.log(this);
});

const User = mongoose.model("signup", userSchema);

module.exports = User;
