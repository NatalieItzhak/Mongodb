const express = require('express');
const router = express.Router();
const productsControler = require('../controllers/products.contorller');


router
.get('/', (req, res) => {
   productControler.getProducts(req, res);
 })
 .get('/active', (req, res) => {
   productControler.activeProducts(req, res);
 })
 .get('/price', (req, res) => {
   productControler.getByPriceRange(req, res);
 }).get('/',(req,res)=>{
   productsControler.getAll(req,res);
}).post('/',(req,res)=>{
   productsControler.create(req,res);
})

module.exports = router;
