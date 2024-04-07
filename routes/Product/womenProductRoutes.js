import express from 'express'
import { isAdmin, requireSignIn } from '../../middlewares/authMiddleware.js';
import { createWomenProductController, deleteWomenProductController, getSingleWomenProductController, getWomenProductController, updateWomenProductController, womenProductPhotoController  } from '../../controllers/Product/womenProductController.js';
import formidable from "express-formidable";

const router = express.Router()

//routes
// creare women product 
router.post('/womenProduct',requireSignIn,isAdmin, formidable(), createWomenProductController)
//update product
router.put('/updateWomenProduct/:pid',requireSignIn,isAdmin, formidable(), updateWomenProductController)
//get all Product 

router.get('/women-get-Product',getWomenProductController)
//get single product

router.get('/women-get-Product/:slug',getSingleWomenProductController)

//get product photo
router.get('/women-product-photo/:pid',womenProductPhotoController)

//delete product
router.delete('/delete-women-product/:pid',deleteWomenProductController)

export default router