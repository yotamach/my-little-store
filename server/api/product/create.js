const ProductService = require('../../services/productService');

module.exports = async function(req, res) {
	const productService = new ProductService();
	productService.createProduct(req.body)
	.then(product => res.send({product}))
	.catch(err => res.status(500).json({error: err}));
};