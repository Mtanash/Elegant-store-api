const Product = require("../models/product");
const mongoose = require("mongoose");

const getAllProducts = async (req, res) => {
  let { page } = req.query;
  if (!parseInt(page)) page = 1;
  const limit = 10;
  const skip = (parseInt(page) - 1) * limit;
  const documentsCount = await Product.countDocuments({});
  const totalPages = Math.ceil(documentsCount / limit);
  if (page > totalPages) page = totalPages;
  try {
    const products = await Product.find({}).skip(skip).limit(limit);
    res.json({ products, totalPages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(400).json({ message: "Please provide a valid id!" });

  try {
    const product = await Product.findById(_id);
    if (!product) return res.status(404).json({ message: "No product found!" });

    res.json(product);
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
    const products = await Product.find({ description: { $regex: searchQ } });
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
    const createdProduct = await Product.create(newProductData);
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
  getProductById,
};
