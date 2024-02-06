const router = require("express").Router()
const productController = require('../controller/productController');
const categoryController = require('../controller/categoryController')

router.get("/products",productController.getProducts)
router.get("/categories",categoryController.getProductsByCategory)

module.exports = router

