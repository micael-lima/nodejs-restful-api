describe('Routes Products', () => {
  let request;

  before(() => setupApp()
      .then((app) => {
        request = supertest(app);
      }));

  const defaultProduct = {
    name: 'Product name',
    description: 'Product description',
    price: 100,
  };

  describe('Route GET /products', () => {
    it('Shoud return a list of products', (done) => {
      request
        .get('/products')
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body[0].name).to.be.eql(defaultProduct.name);
          expect(res.body[0].description).to.be.eql(defaultProduct.description);
          expect(res.body[0].price).to.be.eql(defaultProduct.price);

          done(err);
        });
    });
  });
});
