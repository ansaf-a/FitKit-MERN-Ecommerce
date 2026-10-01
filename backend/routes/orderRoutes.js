const express = require("express");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getProductOrderHistory,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, adminOnly, getAllOrders);
router.get("/my-orders", protect, getMyOrders);
router.get("/product/:productId", protect, adminOnly, getProductOrderHistory);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;
