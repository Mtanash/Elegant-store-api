const bcrypt = require("bcrypt");
const User = require("../models/user");
const mongoose = require("mongoose");

const createUser = async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).json({ message: "Invalid email." });
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const newUser = new User({ ...req.body, password: hashedPassword });
  const token = await newUser.generateAuthToken();
  try {
    await newUser.save();
  } catch (e) {
    return res.status(400).json({ error: e.name, message: e.message });
  }

  res.json({ user: newUser, token });
};

const getCurrentUser = async (req, res) => {
  let populateOrders = req.query.popOrders;
  if (!!populateOrders) await req.user.populate("orders");

  // await user.populate("favoriteProducts");

  res.json(req.user);
};

const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return res.status(404).json({ message: "Wrong user credentials!" });

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch)
    return res.status(404).json({ message: "Wrong user credentials!" });

  const token = await user.generateAuthToken();
  res.json({ user, token });
};

const logoutUser = async (req, res) => {
  req.user.tokens = req.user.tokens.filter(
    (token) => token.token !== req.token
  );

  await req.user.save();
  res.send();
};

const deleteUser = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.user._id);
  if (!deletedUser) return res.status(404).json({ message: "No user found" });

  res.send();
};

const addToFavorite = async (req, res) => {
  const { _id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Invalid id" });

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

const addToBought = async (req, res) => {
  const { _id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Invalid id" });

  const productAlreadyExist = req.user.boughtProducts.includes(_id);
  if (productAlreadyExist)
    return res.status(400).json({ message: "Id already exist" });

  try {
    req.user.boughtProducts.push(req.body);
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const addAvatar = async (req, res) => {
  req.user.avatar = req.body.avatar;
  await req.user.save();
  res.send();
};

module.exports = {
  createUser,
  getCurrentUser,
  loginUser,
  logoutUser,
  deleteUser,
  addToFavorite,
  addToBought,
  removeFromFavorite,
  addAvatar,
};
