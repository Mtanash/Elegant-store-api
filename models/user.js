const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      index: true,
    },
    password: {
      type: String,
      minLength: [6, "Password length must be at least 7"],
      required: [true, "Please provide a password"],
      trim: true,
      validate: {
        validator: (value) => {
          return !validator.contains(value.toLowerCase(), "password");
        },
        message: () => `password is not valid`,
      },
    },
    favoriteProducts: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "product",
      },
    ],
    boughtProducts: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "product",
      },
    ],
    avatar: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("orders", {
  ref: "order",
  localField: "_id",
  foreignField: "orderOwner",
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_ACCESS_KEY);
  user.tokens.push({ token });
  await user.save();
  return token;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
