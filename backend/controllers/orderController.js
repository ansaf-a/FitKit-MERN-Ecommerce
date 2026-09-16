const Order = require("../models/Order");

async function createOrder(req, res, next) {
  try {
    const {
      products,
      totalAmount,
      customerName,
      email,
      phone,
      address,
      city,
      pincode,
    } = req.body;

    if (
      !products?.length ||
      !customerName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !pincode
    ) {
      return res
        .status(400)
        .json({ message: "Complete checkout details are required" });
    }

    const order = await Order.create({
      user: req.user.id,
      products,
      totalAmount,
      customerName,
      email,
      phone,
      address,
      city,
      pincode,
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}

async function getMyOrders(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

module.exports = { createOrder, getMyOrders };
