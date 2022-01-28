const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(morgan('tiny'));

const categoriesRoutes = require('./routes/categories.route');
const productRoutes = require('./routes/products.route');
const usersRoutes = require('./routes/users.route');
const ordersRoutes = require('./routes/orders.route');

app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/users', usersRoutes);

mongoose
	.connect(process.env.DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.log(err);
	});

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
