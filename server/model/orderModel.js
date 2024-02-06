const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: mongoose.Types.ObjectId,
  products: [
    {
      product_id: mongoose.Types.ObjectId,
      quantity: Number
    }
  ],
  order_date: Date,
  total_amount: Number,
  status: String
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;