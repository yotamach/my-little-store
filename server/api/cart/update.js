const CartService = require('../../services/cartService');

module.exports = async function(req, res) {
	const {_id} = req.body;
	const cartService = new CartService();
	cartService.updateCart(_id,req.body,(err, cart) => {
		if(err)
			return res.send({error: err}).status(500);
		return res.send({cart});
	 });
};