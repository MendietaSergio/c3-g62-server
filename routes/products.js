const express = require('express');
const router = express.Router();

const { getAll, newProduct, updateProduct, deleteProduct, detailProduct, getAllCategories, newCategorie, productUserID, search, newComment, formConsult, getPagination } = require('../controllers/productosController')
const {validateJwt} = require('../middlewares');

router 
    .get('/',getAll)
    .get('/pagination', getPagination)
    .get('/detail/:id', detailProduct)
    .get('/search',search)
    .get('/productsUser/:id',productUserID)
    .post('/', newProduct)
    .put('/:id', updateProduct)
    .post('/:idProduct/comment', newComment)
    .delete('/:id', deleteProduct)
    .get('/categories', getAllCategories)
    .post('/categories', newCategorie)
    .post('/formConsult', formConsult)
module.exports = router;