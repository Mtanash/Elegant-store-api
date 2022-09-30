const Product = require("../models/product.model");
const Rate = require("../models/rate.model");
const Review = require("../models/review.model");
const mongoose = require("mongoose");
const { s3 } = require("../s3");

const getAllProducts = async (req, res, next) => {
  const { featured, search, sort, fields, category } = req.query;
  let queryObject = {};

  // query
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  // search
  if (search) {
    const searchQ = new RegExp(
      `\W*(${search?.trim()?.toLowerCase()})\W*`,
      "ig"
    );
    queryObject.description = { $regex: searchQ };
  }

  // category
  if (category) {
    queryObject.category = category;
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
    const products = await result.populate({ path: "rates", select: "value" });
    res.json({
      products,
      totalPages,
      itemsCount: products.length,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(400).json({ message: "Please provide a valid id!" });

  try {
    const product = await Product.findById(_id).populate({
      path: "rates",
      select: "value",
    });
    if (!product) return res.status(404).json({ message: "No product found!" });

    res.json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const productImageFile = req.file;
    const productData = {
      ...req.body,
      price: parseInt(req.body.price),
      stock: parseInt(req.body.stock),
    };

    if (!productImageFile)
      res.status(404).json({ message: "Product image not found!" });

    const createdProduct = await Product.create(productData);
    const uploadedImage = await s3
      .upload({
        Bucket: process.env.PRODUCTS_IMAGES_BUCKET_NAME,
        Key: createdProduct._id.toString(),
        Body: productImageFile.buffer,
      })
      .promise();

    createdProduct.imageUrl = uploadedImage.Location;

    await createdProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", data: createdProduct });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId))
    return res.status(404).json({ message: "Please provide a valid id!" });

  await s3
    .deleteObject({
      Bucket: process.env.PRODUCTS_IMAGES_BUCKET_NAME,
      Key: productId.toString(),
    })
    .promise();

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct)
      return res.status(404).json({ message: "Product does not exist!" });

    res.json(deletedProduct);
  } catch (error) {
    next(error);
  }
};

const addReview = async (req, res, next) => {
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
  } catch (error) {
    next(error);
  }
};

const getProductReviews = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const productReviews = await Review.find({ product: productId })
      .populate({ path: "rate", select: "value owner" })
      .populate({ path: "owner", select: "name avatar" });
    res.json(productReviews);
  } catch (error) {
    next(error);
  }
};

const getProductRates = async (req, res, next) => {
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
  } catch (error) {
    next(error);
  }
};

const checkUserReviewedProduct = async (req, res, next) => {
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
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId))
    return res.status(404).json({ message: "Please provide a valid id!" });

  try {
    await Product.findByIdAndUpdate(productId, req.body);

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductById,
  addReview,
  getProductReviews,
  getProductRates,
  checkUserReviewedProduct,
  updateProduct,
};
