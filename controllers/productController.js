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

const allProductsController = async (req, res) => {
  try {
    const products = await productModel.find({});
    if (!products) {
      return res
        .status(200)
        .send({ success: false, message: "No product found" });
    }

    return res
      .status(200)
      .send({ success: true, total: products.length, products });
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
  createProductController,
  allProductsController,
  singleProductController,
};
