const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const creatorSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [
        20,
        "Name field is longer than the maximum allowed length 20",
      ],
      required: [true, "The field is required"],
    },
    surnames: {
      type: String,
      trim: true,
      maxlength: [
        20,
        "Surnames field is longer than the maximum allowed length 20",
      ],
      required: [true, "The field is required"],
    },
    position: {
      type: String,
      trim: true,
      minlength: [
        3,
        "Position field is shorter than the minimum allowed length 3",
      ],
      maxlength: [
        30,
        "Position field is longer than the maximum allowed length 30",
      ],
      required: [true, "The field is required"],
    },
    // description: {
    //   type: String,
    //   trim: true,
    //   minlength: [
    //     255,
    //     "Description field is shorter than the minimum allowed length 255",
    //   ],
    //   maxlength: [
    //     510,
    //     "Description field is longer than the maximum allowed length 510",
    //   ],
    //   required: [true, "The field is required"],
    // },
    // education: {
    //   type: String,
    //   trim: true,
    //   minlength: [
    //     160,
    //     "Education field is shorter than the minimum allowed length 160",
    //   ],
    //   maxlength: [
    //     255,
    //     "Education field is longer than the maximum allowed length 255",
    //   ],
    //   required: [true, "The field is required"],
    // },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Creator = mongoose.model("Creator", creatorSchema);
module.exports = Creator;
