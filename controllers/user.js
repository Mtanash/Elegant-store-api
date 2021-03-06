const bcrypt = require("bcrypt");
const User = require("../models/User");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

const cleanUserObj = (user) => {
  const userObj = user.toObject();
  delete userObj?.password;
  delete userObj?.refreshToken;
  delete userObj?.id;
  return userObj;
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  try {
    const user = await User.findOne({ _id: userId, refreshToken });
    if (!user) return res.sendStatus(401);
    const userObj = cleanUserObj(user);
    res.json(userObj);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).json({ message: "Invalid email." });
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword });
    const accessToken = newUser.generateAccessToken();
    const refreshToken = await newUser.generateRefreshToken();
    await newUser.save();
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const userObj = cleanUserObj(newUser);

    res.status(201).json({ user: userObj, accessToken });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getFavoriteProducts = async (req, res) => {
  try {
    await req.user.populate("favoriteProducts");
    res.json(req.user.favoriteProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ orderOwner: req.user._id })
      .populate({
        path: "orderProducts",
        select: "_id description price",
      })
      .sort("-createdAt");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(404).json({ message: "Wrong user credentials!" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch)
      return res.status(404).json({ message: "Wrong user credentials!" });

    const accessToken = user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const userObj = cleanUserObj(user);

    res.json({ user: userObj, accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const googleAuth = async (req, res) => {
  const { name, email, password, imageUrl } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({ name, email, password, avatar: imageUrl });
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    const userObj = cleanUserObj(user);
    res.json({ user: userObj, accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logoutUser = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = "";
  await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(200);
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user._id);
    if (!deletedUser) return res.status(404).json({ message: "No user found" });

    // delete user orders
    await Order.deleteMany({ orderOwner: req.user._id });

    res.send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addToFavorite = async (req, res) => {
  const { _id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Invalid id" });

  // check if there is a product with the given id
  const product = await Product.findById(_id);
  if (!product)
    return res.status(404).json({ message: "No product matches the id" });

  const productAlreadyExist = req.user.favoriteProducts.includes(_id);
  if (productAlreadyExist)
    return res.status(400).json({ message: "Id already exist" });

  try {
    req.user.favoriteProducts.push(req.body);
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const removeFromFavorite = async (req, res) => {
  const { _id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Invalid id" });

  // check if there is a product with the given id
  const product = await Product.findById(_id);
  if (!product)
    return res.status(404).json({ message: "No product matches the id" });

  const productExist = req.user.favoriteProducts.includes(_id);
  if (!productExist)
    return res
      .status(400)
      .json({ message: "Product is not in user favorite products" });

  try {
    req.user.favoriteProducts = req.user.favoriteProducts.filter(
      (product) => product.toString() !== _id
    );
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const addAvatar = async (req, res) => {
  req.user.avatar = req.body.avatar;
  try {
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  deleteUser,
  addToFavorite,
  removeFromFavorite,
  addAvatar,
  getFavoriteProducts,
  getUserOrders,
  googleAuth,
  getUserById,
};
