const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    minlength: [2, "Minimum password length is 6 characters"],
    maxlength: [20, "Maximum password length is 20 characters"],
    required: [true, "Please enter a user name"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, "Please enter a valid email"],
    required: [true, "Please enter an email"],
  },
  password: {
    type: String,
    trim: true,
    minlength: [6, "Minimum password length is 6 characters"],
    maxlength: [56, "Maximum password length is 56 characters"],
    required: [true, "Please enter a password"],
  },
  admin: {
    type: Boolean,
    default: false,
  },
  readPostIds: {
    type: [String],
    trim: true,
    minlength: [24, "Id not correct"],
    maxlength: [24, "Id not correct"],
  },
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
