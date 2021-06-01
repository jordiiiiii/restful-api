const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create post Schema & model
const postSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: [
        20,
        "Title field is shorter than the minimum allowed length 20",
      ],
      maxlength: [
        88,
        "Title field is longer than the maximum allowed length 88",
      ],
      required: [true, "The field is required"],
    },
    snippet: {
      type: String,
      trim: true,
      minlength: [
        100,
        "Snippet field is shorter than the minimum allowed length 100",
      ],
      maxlength: [
        180,
        "Snippet field is longer than the maximum allowed length 180",
      ],
      required: [true, "The field is required"],
    },
    body: {
      type: String,
      // trim: true,
      minlength: [
        2000,
        "Body field is shorter than the minimum allowed length 2000",
      ],
      maxlength: [
        6000,
        "Body field is longer than the maximum allowed length 6000",
      ],
      required: [true, "The field is required"],
    },
    imageUrl: {
      type: String,
      trim: true,
      required: [true, "The field is required"],
    },
    available: {
      type: Boolean,
      default: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Creator",
      required: [true, "The field is required"],
    },
    tag: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
      required: [true, "The field is required"],
    },
  },
  { timestamps: true }
);

// name: "Post" perque es el singular de la colleccio Posts a database
const Post = mongoose.model("Post", postSchema);
module.exports = Post;

// <v-file-input
//     v-model="image"
//       :rules="[imageSize(), imageRequired()]"
// accept="image/png, image/jpeg, image/bmp"
// placeholder="Pick an Image"
// prepend-icon="mdi-camera"
// label="Image"
// id="pickedImage"
// ref="pickedImage"
// @change="onFilePicked"
// />

// imageRequired() {
//   return p =>
//     (p && p.id === undefined && p.imageUrl === undefined) ||
//     "The Image is required";
// },
// imageSize() {
//   return value =>
//     !value ||
//     value.size < 1000000 ||
//     "Avatar size should be less than 1 MB!";
// },
