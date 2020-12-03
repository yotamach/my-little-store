const ProductService = require('../../services/productService');

module.exports = async function(req, res, next) {
	const userId = req.query.userId;
	const productService = new ProductService();
	productService.getProducts((err, products) => {
		if(err){
			res.json({error: err}).status(500)
		} else{
		  if(products.length === 0){
			  res.json({error: "There is on products in stock"}).status(500)
		  } else{
			res.send({products});
		  }
		}
	 });
};