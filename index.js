const express = require("express");
let app = express();
const port = process.env.PORT || 3000;
const cache = require("nocache");
const session = require("express-session");
require("dotenv").config();
let path = require("path");
let router = require("./router");
//Following principle *ECSV*:

//express-middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//view engine-Set:
app.set("view engine", "ejs");
app.set("views", "views");

//cache-handle:
app.use(cache());

//session-handle:
app.use(
  session({
    secret: "this is my fourth week task",
    resave: false,
    saveUninitialized: true,
  })
);

//view engine-Set:
app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", router);

//app.listen
app.listen(port, () => {
  console.log("post is on http://localhost:3000");
});
