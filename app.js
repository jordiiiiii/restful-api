// // CONNECT TO DB
require("./db/mongoose");
let express = require("express");
// let cors = require('cors')
let cookieParser = require("cookie-parser");
let logger = require("morgan");
// // IMPORT ROUTES
const authRoutes = require("./api/routes/authRoutes");
const postRoutes = require("./api/routes/postRoutes");
const tagRoutes = require("./api/routes/tagRoutes");
const creatorRoutes = require("./api/routes/creatorRoutes");
const userRoutes = require("./api/routes/userRoutes");
// // SET UP EXPRESS APP
let app = express();
// // MIDDLEWARES & // // STATIC FILES
app.use(logger("dev"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// // HANDLER CORS(Cross-Origin Resource Sharing) // podria instal·lar npm install cors, pero no ho faré
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // with "*" all are permitted, in the future can be just "http://www.grail.com"
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});
// app.use(cors());
// // ROUTES
// auth routes
app.use(authRoutes);
// blog routes
app.use("/posts", postRoutes);
// creator routes
app.use("/creators", creatorRoutes);
// tag routes
app.use("/tags", tagRoutes);
// // user routes
// app.use("/users", userRoutes);
// // CATCH 404 AND FORWARD TO ERROR HANDLER
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
// // ERROR HANDLER
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message + "_yoyo",
    },
  });
});

module.exports = app;
