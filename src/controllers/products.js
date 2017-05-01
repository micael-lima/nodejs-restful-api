class ProductsController {
  constructor(Product) {
    Object.assign(this, {Product});
  }

  post(req, res) {
    const product = req.body;

    return this.Product.create(product)
      .then(newProduct => res.status(201).send(newProduct))
      .catch(err => res.status(400).json({
        error: {
          code: 400,
          type: 'Bad Request',
          message: ''
        }
      }));
  }

  get(req, res) {
    return this.Product.find({})
      .then(products => res.send(products))
      .catch(err => res.status(400).json({
        error: {
          code: 400,
          type: 'Bad Request',
          message: ''
        }
      }));
  }

  getById(req, res) {
    const {productId} = req.params;

    return this.Product.findById(productId)
      .then(product => {
        if (!product)
          throw new Error();

        return res.json(product);
      })
      .catch(err => res.status(404).send({
        error: {
          code: 404,
          type: 'Not Found',
          message: 'Product not found'
        }
      }));
  }

  update(req, res) {
    const {productId} = req.params;
    const product = req.body;

    return this.Product.findByIdAndUpdate(productId, product, {new: true})
      .then(result => {res.json(result)})
      .catch(err => res.json({
        error: {
          code: 404,
          type: 'Not Found',
          message: 'Product not found'
        }
      }));
  }

  delete(req, res) {
    const {productId} = req.params;

    return this.Product.findByIdAndRemove(productId)
      .then(() => res.status(204).end())
      .catch(err => res.status(404).send({
        error: {
          code: 404,
          type: 'Not Found',
          message: 'Product not found'
        }
      }));
  }
}

export default ProductsController;
