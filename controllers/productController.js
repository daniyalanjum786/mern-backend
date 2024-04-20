import productModel from "../models/productModel.js";

const createProductController = async (req, res) => {
  try {
    const { name, description, price, images, category } = req.body;
    if (!name || !description || !price || !images || !category) {
      return res.send({ success: false, message: "All fields are required" });
    }
    // adding product into the database
    const product = await productModel.create({
      name,
      description,
      price,
      images,
      category,
    });
    return res
      .status(201)
      .send({ success: true, message: "New product added", product });
  } catch (error) {
    console.log(`createProductController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in createProductController",
      error,
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const productId = req.params.id;

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(200).send({
        success: false,
        message: "something went wrong while updating the product",
      });
    }

    return res.status(201).send({
      success: true,
      message: "Product details updated",
      updatedProduct,
    });
  } catch (error) {
    console.log(`updateProductController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in updateProductController",
      error,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await productModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(200).send({
        success: false,
        message: "something went wrong while delete the product",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    console.log(`deleteProductController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in deleteProductController",
      error,
    });
  }
};

const allProductsController = async (req, res) => {
  try {
    const searchQuery = req.query.q; // Search query parameter
    const categoryFilter = req.query.category; // Category filter parameter
    const page = parseInt(req.query.page) || 1; // Page number, default to 1 if not provided
    const pageSize = 3; // Number of products per page

    let query = {}; // Initialize an empty query object

    // If a search query is provided, add it to the query object
    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: "i" }; // Case-insensitive search by name
    }

    // If a category filter is provided, add it to the query object
    if (categoryFilter) {
      query.category = categoryFilter;
    }

    // Count total number of products matching the query
    const totalCount = await productModel.countDocuments(query);

    // Calculate skip value based on page number and page size
    const skip = (page - 1) * pageSize;

    // Use the query object to find products that match the search query and/or category filter
    const products = await productModel.find(query).skip(skip).limit(pageSize);

    if (!products || products.length === 0) {
      return res
        .status(200)
        .send({ success: false, message: "No products found" });
    }

    return res
      .status(200)
      .send({ success: true, total: totalCount, page, pageSize, products });
  } catch (error) {
    console.log(`allProductsController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in allProductsController",
      error,
    });
  }
};

const singleProductController = async (req, res) => {
  try {
    const product_id = req.params.id;

    const product = await productModel.findById(product_id);
    if (!product) {
      return res
        .status(200)
        .send({ success: false, message: "No product found" });
    }

    return res.status(200).send({ success: true, product });
  } catch (error) {
    console.log(`singleProductController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in singleProductController",
      error,
    });
  }
};

export {
  updateProductController,
  createProductController,
  allProductsController,
  singleProductController,
  deleteProductController,
};
