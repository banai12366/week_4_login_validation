const express = require("express");
const router = express.Router();

//default request
router.get("/", (req, res) => {
  if (req.session.pass == false) {
    console.log("password-error!!");
    req.session.pass = true;
    res.render("body", { msg: "password-Error" });
    return;
  }

  res.redirect("/home");
  return;
});

let uerDefinedValue = {
  em: "ravi@mail",
  ps: 1234,
};

//data recieved form form
router.post("/verify", (req, res) => {
  let { em, ps } = uerDefinedValue;
  let { email, pswd } = req.body;
  console.log(req.body);

  if (!email || !pswd) {
    console.log("email and password 404");
    req.session.pass = false;
    res.redirect("/");
    return;
  }

  if (email != em) {
    console.log("email 404");
    req.session.pass = false;
    res.redirect("/");
    return;
  }

  if (pswd != ps) {
    console.log("pass 404");
    req.session.pass = false;
    res.redirect("/");
    return;
  }

  console.log("Login successful...");
  req.session.renderHOme = true;
  res.redirect("/home");
  return;
});

//form validation done sucesfully
router.get("/home", (req, res) => {
  if (req.session.renderHOme) {
    console.log("home page rendered success...");
    res.render("homePage", { user: `welcome ${uerDefinedValue.em}` });
    return;
  }

  console.log("req.session.renderHOme = false");
  res.render("body", { msg: "" });
  return;
});

//when logout
router.get("/logout", (req, res) => {
  console.log("destroy session - 200");
  req.session.destroy();
  res.redirect("/");
  return;
});

//export the module;
module.exports = router;
