const Order = require("../models/Order");
const Product = require("../models/Product");

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

    // Step 1: Verify all products exist and have sufficient stock
    for (const item of products) {
      const prodId = item.product?._id || item.product;
      if (prodId) {
        const prod = await Product.findById(prodId);
        if (!prod) {
          return res.status(404).json({
            message: `Product "${item.name || "item"}" was not found.`,
          });
        }
        if (prod.stock < item.quantity) {
          return res.status(400).json({
            message: `Insufficient stock for "${prod.name}". Only ${prod.stock} unit(s) available.`,
          });
        }
      }
    }

    // Step 2: Atomically deduct stock for each product
    for (const item of products) {
      const prodId = item.product?._id || item.product;
      if (prodId) {
        await Product.findByIdAndUpdate(prodId, {
          $inc: { stock: -item.quantity },
        });
      }
    }

    // Step 3: Create the order
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
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .lean();
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

async function getAllOrders(req, res, next) {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .lean();
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    const { status } = req.body;
    const validStatuses = ["Pending", "Confirmed", "Delivered", "Cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Allowed values: ${validStatuses.join(", ")}`,
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const previousStatus = order.status;

    // If order was cancelled, replenish product stocks
    if (previousStatus !== "Cancelled" && status === "Cancelled") {
      for (const item of order.products) {
        const prodId = item.product?._id || item.product;
        if (prodId) {
          await Product.findByIdAndUpdate(prodId, {
            $inc: { stock: item.quantity },
          });
        }
      }
    }
    // If reactivating a cancelled order, re-deduct product stocks
    else if (previousStatus === "Cancelled" && status !== "Cancelled") {
      for (const item of order.products) {
        const prodId = item.product?._id || item.product;
        if (prodId) {
          await Product.findByIdAndUpdate(prodId, {
            $inc: { stock: -item.quantity },
          });
        }
      }
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    next(error);
  }
}

async function getProductOrderHistory(req, res, next) {
  try {
    const { productId } = req.params;
    const orders = await Order.find({ "products.product": productId })
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .lean();
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getProductOrderHistory,
};

