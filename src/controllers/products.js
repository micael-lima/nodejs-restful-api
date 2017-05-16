'use strict'
import Product from '../models/product'

function post (req, res) {
  let product = req.body

  Product.create(product)
    .then(newProduct => res.status(201).send(newProduct))
    .catch(() => res.status(400).json({
      error: {
        code: 400,
        type: 'Bad Request',
        message: ''
      }
    }))
}

function get (req, res) {
  Product.find({})
    .then(products => res.send(products))
    .catch(() => res.status(400).json({
      error: {
        code: 400,
        type: 'Bad Request',
        message: ''
      }
    }))
}

function getById (req, res) {
  let { productId } = req.params

  Product.findById(productId)
    .then(product => {
      if (!product) throw new Error({ code: 404 })

      res.json(product)
    })
    .catch(() => res.status(404).send({
      error: {
        code: 404,
        type: 'Not Found',
        message: 'Product not found'
      }
    }))
}

function update (req, res) {
  let { productId } = req.params
  let product = req.body

  Product.findByIdAndUpdate(productId, product, {new: true})
    .then(result => {
      if (!result) throw new Error({ code: 404 })

      res.json(result)
    })
    .catch(() => res.status(404).json({
      error: {
        code: 404,
        type: 'Not Found',
        message: 'Product not found'
      }
    }))
}

function remove (req, res) {
  let { productId } = req.params

  Product.findByIdAndRemove(productId)
    .then(result => {
      if (!result) throw new Error({ code: 404 })

      res.status(204).end()
    })
    .catch(() => res.status(404).send({
      error: {
        code: 404,
        type: 'Not Found',
        message: 'Product not found'
      }
    }))
}

export default { post, get, getById, update, remove }
