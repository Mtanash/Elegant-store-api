const Product = require("../models/Product");
const Rate = require("../models/Rate");
const Review = require("../models/Review");
const mongoose = require("mongoose");
const generateUploadUrl = require("../s3");

const getAllProducts = async (req, res) => {
  const { featured, search, sort, fields } = req.query;
  let queryObject = {};

  // query
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (search) {
    const searchQ = new RegExp(
      `\W*(${search?.trim()?.toLowerCase()})\W*`,
      "ig"
    );
    queryObject.description = { $regex: searchQ };
  }

  let result = Product.find(queryObject);

  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result.sort(sortList);
  }

  // select fields

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result.select(fieldsList);
  }

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(
    (await Product.countDocuments(queryObject)) / limit
  );

  result.skip(skip).limit(limit);

  try {
    const products = await result;
    res.json({
      products,
      totalPages,
      itemsCount: products.length,
    });
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

const createProduct = async (req, res) => {
  try {
    const newProductData = req.body;
    const createdProduct = await Product.create(newProductData);
    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getImageUploadUrl = async (req, res) => {
  const imageName = req.params.productId;
  try {
    const url = await generateUploadUrl(imageName);
    res.json({ url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addProductImage = async (req, res) => {
  const { productId, imageUrl } = req.body;
  try {
    const product = await Product.findById(productId);
    product.imageUrl = imageUrl;
    await product.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addReview = async (req, res) => {
  const { text, rate, productId } = req.body;
  const user = req.user;

  try {
    const createdRate = await Rate.create({
      value: rate,
      owner: user._id,
      product: productId,
    });
    await Review.create({
      text,
      owner: user._id,
      rate: createdRate._id,
      product: productId,
    });

    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductReviews = async (req, res) => {
  const productId = req.params.id;

  try {
    const productReviews = await Review.find({ product: productId })
      .populate({ path: "rate", select: "value owner" })
      .populate({ path: "owner", select: "name avatar" });
    res.json(productReviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductRates = async (req, res) => {
  const productId = req.params.id;

  try {
    const productRates = await Rate.find({ product: productId }).select(
      "owner value"
    );
    const totalRates = productRates.length;
    let totalRatesValue = 0;
    for (let i of productRates) {
      totalRatesValue += i.value;
    }
    res.json({ productRates, totalRates, totalRatesValue });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const checkUserReviewedProduct = async (req, res) => {
  const user = req.user;
  const productId = req.params.id;
  try {
    const review = await Review.findOne({
      product: productId,
      owner: {
        _id: user._id,
      },
    })
      .populate({ path: "rate", select: "value owner" })
      .populate({ path: "owner", select: "name avatar" });
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductById,
  getImageUploadUrl,
  addProductImage,
  addReview,
  getProductReviews,
  getProductRates,
  checkUserReviewedProduct,
};
