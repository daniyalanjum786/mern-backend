// const allProductsController = async (req, res) => {
//   try {
//     const searchQuery = req.query.q; // Assuming the search term is passed as a query parameter named 'q'
//     let products;

//     if (searchQuery) {
//       // If a search term is provided, search for products whose name contains the search term
//       products = await productModel.find({
//         name: { $regex: searchQuery, $options: "i" },
//       });
//     } else {
//       // If no search term is provided, retrieve all products
//       products = await productModel.find({});
//     }

//     if (!products || products.length === 0) {
//       return res
//         .status(200)
//         .send({ success: false, message: "No products found" });
//     }

//     return res
//       .status(200)
//       .send({ success: true, total: products.length, products });
//   } catch (error) {
//     console.log(`allProductsController Error - ${error}`);
//     res.status(500).send({
//       success: false,
//       message: "Error in allProductsController",
//       error,
//     });
//   }
// };
// =========================================================================
// const allProductsController = async (req, res) => {
//   try {
//     const searchQuery = req.query.q; // Search query parameter
//     const categoryFilter = req.query.category; // Category filter parameter

//     let query = {}; // Initialize an empty query object

//     // If a search query is provided, add it to the query object
//     if (searchQuery) {
//       query.name = { $regex: searchQuery, $options: "i" }; // Case-insensitive search by name
//     }

//     // If a category filter is provided, add it to the query object
//     if (categoryFilter) {
//       query.category = categoryFilter;
//     }

//     // Use the query object to find products that match the search query and/or category filter
//     const products = await productModel.find(query);

//     if (!products || products.length === 0) {
//       return res
//         .status(200)
//         .send({ success: false, message: "No products found" });
//     }

//     return res
//       .status(200)
//       .send({ success: true, total: products.length, products });
//   } catch (error) {
//     console.log(`allProductsController Error - ${error}`);
//     res.status(500).send({
//       success: false,
//       message: "Error in allProductsController",
//       error,
//     });
//   }
// };
// ==============================================================================
const allProductsController = async (req, res) => {
  try {
    const searchQuery = req.query.q; // Search query parameter
    const categoryFilter = req.query.category; // Category filter parameter
    const page = parseInt(req.query.page) || 1; // Page number, default to 1 if not provided
    const pageSize = 9; // Number of products per page

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
