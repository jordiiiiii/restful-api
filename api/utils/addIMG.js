// set up multer for storing uploaded files
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    // cb(null, Date.now() + "_" + file.originalname);
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("No file accepted, has to be jpeg or png"), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024, // one megabyte
  },
  fileFilter,
});

module.exports = {
  upload,
};
