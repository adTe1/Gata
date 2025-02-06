const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = catchAsync(async (req, res, next) => {
  // attach the user from the protect middleware
  req.body.user = req.user._id;

  const newOrder = await Order.create(req.body)


  res.status(201).json({
    status: 'success',
    data: newOrder
  });
});


// @desc    Get all orders (Admin only)
// @route   GET /api/v1//orders
// @access  Private/Admin
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find().populate('user', 'name email');
  
  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: {
      data: orders
    }
  });
});


// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = factory.getOne(Order, { 
  path: 'user', 
  select: 'name email' 
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
exports.updateOrderToPaid = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  };

  const updatedOrder = await order.save();

  res.status(200).json({
    status: 'success',
    data: updatedOrder,
  });
});

// exports.updateOrderToPaid = catchAsync(async (req, res, next) => {
//   const { id, status, update_time, email_address } = req.body;

//   if (!id || !status || !update_time || !email_address) {
//     return next(new AppError('Incomplete payment details', 400));
//   }

//   const order = await Order.findById(req.params.id);

//   if (!order) {
//     return next(new AppError('Order not found', 404));
//   }

//   order.isPaid = true;
//   order.paidAt = Date.now();
//   order.paymentResult = { id, status, update_time, email_address };

//   const updatedOrder = await order.save();

//   res.status(200).json({
//     status: 'success',
//     data: updatedOrder,
//   });
// });

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
exports.updateOrderToDelivered = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();

  res.status(200).json({
    status: 'success',
    data: updatedOrder,
  });
});

// @desc    Get logged-in user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  // Παράδειγμα ενοποίησης
res.status(200).json({
  status: 'success',
  results: orders.length,
  data: {
    data: orders
  }
});

  });


// exports.getMyOrders = catchAsync(async (req, res, next) => {
//   const page = req.query.page * 1 || 1;
//   const limit = req.query.limit * 1 || 10;
//   const skip = (page - 1) * limit;

//   const orders = await Order.find({ user: req.user._id })
//     .skip(skip)
//     .limit(limit)
//     .sort('-createdAt');

//   res.status(200).json({
//     status: 'success',
//     results: orders.length,
//     data: orders,
//   });
// });











// const Order = require('./../models/orderModel');
// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');
// const factory = require('./../controllers/handlerFactory');


// // Post/api/orders
// exports.createOrder = factory.createOne(Order);

// // GET /api/orders/myorders
// exports.getMyOrders = catchAsync(async (req, res, next) => { 
//     res.send('add order items');
// });

// // GET /api/orders/:id
// exports.getOrder = factory.getOne(Order);



// // GET /api/orders/:id/pay
// exports.updateOrderToPaid = catchAsync(async (req, res, next) => { 
//     res.send('update order to paid');
// });

// // GET /api/orders/:id/deliver
// //@access  Private/Admin/
// exports.updateOrderToDelivered = catchAsync(async (req, res, next) => { 
//     res.send('update order to delivered');
// });


// // GET /api/orders/
// //@access  Private/Admin/
// exports.getAllOrders = factory.getAll(Order); 








