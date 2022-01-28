const { Product } = require('../models/product.model');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	const productList = await Product.find();

	if (!productList) {
		res.status(404).send('Product not found');
	}
	res.send(productList);
});

router.post('/', (req, res) => {
	const product = new Product({
		name: req.body.name,
		price: req.body.price,
		description: req.body.description,
		image: req.body.image,
		countInStock: req.body.countInStock,
	});

	product
		.save()
		.then((createdProduct) => {
			res.status(201).json(createdProduct);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
});

module.exports = router;
