const Product = require('../models/product/Product');

module.exports = class ProductService {
    constructor(){}
  
  getProducts(cb) {
      return Product.find({},cb);
   }

   createProduct(product) {
    const productToSave = new Product(product);
    return productToSave.save();
  }
  }