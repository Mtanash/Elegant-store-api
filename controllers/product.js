const Product = require("../models/product");
const mongoose = require("mongoose");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  if (!products) return res.status(404).json({ message: "Error, not found" });
  res.json(products);
};

const createProduct = async (req, res) => {
  try {
    const newProductData = req.body;
    const createdProduct = new Product(newProductData);

    if (!createdProduct)
      return res.status(400).json({ message: "Failed to create product!" });

    await createdProduct.save();
    res.json(createdProduct);
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

module.exports = { getAllProducts, createProduct, deleteProduct };
