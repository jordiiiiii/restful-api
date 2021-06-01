const fs = require("fs");

let deleteImage = (imageName) => {
  if (fs.existsSync(imageName)) {
    fs.unlink(imageName, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("file deleted");
    });
  }
};

module.exports = {
  deleteImage,
};
