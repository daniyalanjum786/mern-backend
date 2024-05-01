import OrderModel from "../models/orderModel.js";

// POST: Create a new order
const addOrderItemsController = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  try {
    if (orderItems && orderItems.length === 0) {
      res.status(400); // Bad request error
      return res.send({ message: "No order items" });
    } else {
      const order = new OrderModel({
        orderItems,
        user: req.user.id, // Assuming user is added to req by auth middleware
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(201).send({
        success: true,
        message: "Order creation successful",
        createdOrder,
      }); // Order creation successful
    }
  } catch (error) {
    console.log(`addOrderItemsController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in addOrderItemsController",
      error,
    });
  }
};

const getMyOrdersController = async (req, res) => {
  try {
    // Assuming the user ID is stored in req.user.id from a middleware that authenticates the user
    const orders = await OrderModel.find({ user: req.user.id });

    if (orders.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "No orders found" });
    }

    res.status(200).send({ success: true, orders });
  } catch (error) {
    console.error("getMyOrders Error:", error);
    res
      .status(500)
      .send({ success: false, message: "Unable to retrieve orders", error });
  }
};
const getOrderByIdController = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res
        .status(404)
        .send({ success: false, message: "Order not found" });
    }

    res.status(200).send({ success: true, order });
  } catch (error) {
    console.error("getOrderById Error:", error);
    res
      .status(500)
      .send({ success: false, message: "Unable to retrieve order", error });
  }
};

// For Admin

const getAllOrdersController = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== 1) {
      // Assuming '1' is the role number for admins
      return res.status(403).send({
        success: false,
        message: "Access denied. Only admins can access this resource.",
      });
    }

    const orders = await OrderModel.find({}).populate("user", "name email"); // Populate user details

    if (orders.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "No orders found" });
    }
    res.status(200).send({ success: true, orders });
  } catch (error) {
    console.error("getAllOrders Error:", error);
    res
      .status(500)
      .send({ success: false, message: "Unable to retrieve orders", error });
  }
};

export {
  addOrderItemsController,
  getMyOrdersController,
  getAllOrdersController,
  getOrderByIdController,
};
