const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = process.env.DBURI;
mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then((result) =>
		app.listen(3000, () => {
			console.log("the app is listenning");
		})
	)
	.catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use("/", router);

//cookieParser trying
// app.get("/cookies", (req, res) => {
// 	res.cookie("jwt", "sfqljmfsmdjifjqdsmifjs", {
// 		maxAge: Date.now() + 90000,
// 		httpOnly: true,
// 	});
// 	res.send("cookies");
// });
// app.get("/cookie", (req, res) => {
// 	console.log(req.cookies);
// 	res.send("cookie intersepted");
// });
