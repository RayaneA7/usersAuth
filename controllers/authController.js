const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/authModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Create jsonwebtoken
maxAge = 24 * 3600;
createJwt = (id) => {
	return jwt.sign({ id }, process.env.SECRET, { expiresIn: maxAge });
};
verifyJwt = (jwtoken) => {
	try {
		let token = jwt.verify(jwtoken, process.env.SECRET);
		return token;
	} catch (err) {
		console.log(err.name);
		return false;
	}
};

//error handling module
errorHandling = (errors) => {
	error = {
		name: "",
		familyName: "",
		email: "",
		password: "",
	};
	if (errors.code == 11000) {
		//i will return directly the message
		error.email = "please enter another valid email";
		return error;
	}

	if (errors.message.includes("signup validation failed")) {
		Object.values(errors.errors).forEach(({ properties }) => {
			error[properties.path] = properties.message;
		});
	}
	return error;
};

//request handling

module.exports.signup_get = (req, res) => {
	res.render("signup");
};

module.exports.signup_post = async (req, res) => {
	try {
		const user = await User.create(req.body);
		console.log(user);
		res.cookie("jwt", createJwt(user._id), { maxAge: maxAge * 1000 });
		res.status(201).json(user._id);
		//delete an entire collection
		//mongoose.connection.db.dropCollection("signups", function (err, result) {
		//console.log("heello");
		// });
	} catch (err) {
		res.status(404).json(errorHandling(err));
		console.log(err);
	}
};

module.exports.login_get = (req, res) => {
	console.log(verifyJwt(req.cookies.jwt));
	if (verifyJwt(req.cookies.jwt)) {
		res.redirect("/smoothies");
	} else res.render("login");
};

module.exports.login_post = (req, res) => {
	res.send("this is the signup post request");
};
