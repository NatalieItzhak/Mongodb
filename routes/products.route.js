const express = require('express');
const router = express.Router();
const productsControler = require('../controllers/products.contorller');


router.get('/',(req,res)=>{
   productsControler.getAll(req,res);
}).post('/',(req,res)=>{
   productsControler.create(req,res);
})

module.exports = router;
