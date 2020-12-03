const CartService = require('../../services/cartService');

module.exports = async function(req, res) {
	const cartService = new CartService();
	cartService.createCart()
	.then(cart => res.send({cart}))
	.catch(err => res.status(500).json({error: err}));
};