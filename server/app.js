require("dotenv/config");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const userSetUpRouter = require("./routes/UserSetUp/UserSetUp.js");
const settingsRouter = require("./routes/Settings/Settings.js");
const apiCallsRouter = require("./routes/ApiCalls/ApiCalls.js");
const searchRouter = require("./routes/Search/Search.js");
const utilsRouter = require("./routes/Utils/Utils.js");
const app = express();

// Use express middleware for easier cookie handling
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//Set http security headers
app.use(helmet());

//Data Sanitization against XSS
app.use(xss());

// Needed to be able to read body data
// to support JSON-encoded bodies
app.use(express.json());

// to support URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

//Global Middlewares
app.use(userSetUpRouter);
app.use(settingsRouter);
app.use(apiCallsRouter);
app.use(searchRouter);
app.use(utilsRouter);

module.exports = app;
