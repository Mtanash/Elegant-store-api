const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
      unique: [true, "Please provide a valid email"],
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Please provide a valid email",
      },
    },
    password: {
      type: String,
      minLength: [3, "Password length must be at least 7"],
      required: [true, "Please provide a password"],
      trim: true,
      validate: {
        validator: (value) => {
          return !validator.contains(value.toLowerCase(), "password");
        },
        message: () => `password is not valid`,
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
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
    refreshToken: String,
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

userSchema.methods.generateAccessToken = function () {
  const user = this;
  const accessToken = jwt.sign(
    { _id: user._id },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXP,
    }
  );
  return accessToken;
};

userSchema.methods.generateRefreshToken = async function () {
  const user = this;
  const refreshToken = jwt.sign(
    { _id: user._id },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXP,
    }
  );
  user.refreshToken = refreshToken;
  await user.save();
  return refreshToken;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
