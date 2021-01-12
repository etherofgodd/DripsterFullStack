import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc Create New Products
// @route POST /api/orders
// @access Private

const addOrderItems = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }

  res.status(200).json(products);
});

// @desc GET Order by ID
// @route GET /api/orders/:id
// @access Private

const getOrderById = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

// @desc UPDATE Order to Paid
// @route POST /api/orders/:id/pay
// @access Private

const updateOrdertoPaid = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    (order.isPaid = true), (order.paidAt = Date.now());
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const upDatedOrder = await order.save();
    res.status(200).json(upDatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

// @desc GET User Order
// @route GET /api/orders/myorders
// @access Private

const getMyOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
  });

  res.json(orders);
});

export { addOrderItems, getOrderById, updateOrdertoPaid, getMyOrders };
