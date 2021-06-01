const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [
        30,
        "Name field is longer than the maximum allowed length 20",
      ],
      required: [true, "The field is required"],
    },
  },
  { timestamps: true }
);

const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;
