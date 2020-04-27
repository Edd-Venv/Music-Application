require("dotenv/config");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userSetUpRoutes = require("./routes/UserSetUp/UserSetUp.js");
const settingsRoutes = require("./routes/Settings/Settings.js");
const apiCallsRoutes = require("./routes/ApiCalls/ApiCalls.js");
const searchRoutes = require("./routes/Search/Search.js");
const utilsRoutes = require("./routes/Utils/Utils.js");
const server = express();

// Use express middleware for easier cookie handling
server.use(cookieParser());

server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Needed to be able to read body data
server.use(express.json()); // to support JSON-encoded bodies
server.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
server.use(userSetUpRoutes);
server.use(settingsRoutes);
server.use(apiCallsRoutes);
server.use(searchRoutes);
server.use(utilsRoutes);

server.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}!`)
);
