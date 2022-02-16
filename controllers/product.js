const Product = require("../models/product");
const mongoose = require("mongoose");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const searchQ = new RegExp(
      `\W*(${searchQuery?.trim()?.toLowerCase()})\W*`,
      "ig"
    );
    const products = await Product.find({
      $or: [
        { title: { $regex: searchQ } },
        { description: { $regex: searchQ } },
      ],
    });
    if (products.length === 0)
      return res.status(404).json({ message: "No match found" });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProductData = req.body;
    const createdProduct = new Product(newProductData);
    await createdProduct.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId))
    return res.status(400).json({ message: "Please provide a valid id!" });

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct)
      return res.status(404).json({ message: "Product does not exist!" });

    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductsBySearch,
};
