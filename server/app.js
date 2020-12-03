const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');

mongoose.connect('mongodb://localhost:27017/simpleStore', {
	autoReconnect: true,
	reconnectTries: 60,
	reconnectInterval: 10000
});

const port = process.env.PORT || 3001;
const app = express();
app.listen(port);

app.use(cors());
app.use(require('body-parser').json());

app.use('/cart/create', require('./api/cart/create'));
app.use('/cart/update', require('./api/cart/update'));
app.use('/products', require('./api/product/fetch'));
app.use('/product/create', require('./api/product/create'));

console.log(`app running on port ${port}`);

module.exports = app;
