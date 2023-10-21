import products from '../../data/products.js';

export function getProducts(req, res) {
  res.json(products);
}

export function getProduct(req, res) {
  const { id } = req.params;
  const product = products.find(({ _id }) => _id === id);
  res.json(product);
}
