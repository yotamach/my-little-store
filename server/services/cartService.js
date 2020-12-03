const Cart = require('../models/cart/Cart');

module.exports = class CartService {
  constructor() {}

  getCart(cb) {
    Cart.find({},cb);
  }

  createCart() {
    const cart = new Cart({cartItems: [], totalPrice: 0, paid: false});
    return cart.save();
  }

  updateCart(id,objToUpdate,cb) {
    Cart.findOneAndUpdate({
        _id: id,
    },objToUpdate,cb);
  }
}