class ProductsController {
  constructor(Product) {
    Object.assign(this, {Product});
  }

  post(req, res) {
    const product = req.body;

    return this.Product.create(product)
      .then(newProduct => res.status(201).send(newProduct))
      .catch(err => res.status(400).send(err.message));
  }

  get(req, res) {
    return this.Product.find({})
      .then(products => res.send(products))
      .catch(err => res.status(400).send(err.message));
  }

  getById(req, res) {
    const {productId} = req.params;

    return this.Product.findById(productId)
      .then(product => res.send(product))
      .catch(err => res.status(400).send(err.message));
  }

  update(req, res) {
    const {productId} = req.params;
    const product = req.body;

    return this.Product.update({_id: productId}, {$set: product})
      .then(() => {
        return this.Product.findById(productId);
      })
      .then(updatedProduct => res.send(updatedProduct))
      .catch(err => res.status(400).send(err.message));
  }

  delete(req, res) {
    const {productId} = req.params;

    return this.Product.findByIdAndRemove(productId)
      .then(() => res.status(204).end())
      .catch(err => res.status(400).send(err.message));
  }
}

export default ProductsController;
