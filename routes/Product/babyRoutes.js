import express from 'express'
import { isAdmin, requireSignIn } from './../../middlewares/authMiddleware.js';
import formidable from 'express-formidable'
import { createBabyProductController, deleteBabyProductController, getBabyProductController, getProductPhotoController, getSingleBabyProductController, updateBabyProductController } from '../../controllers/Product/babyProductController.js';
const router =express.Router()

//Router
//Create men Product

router.post('/create-baby-product',requireSignIn,isAdmin,formidable(),createBabyProductController)

// get all product 
router.get('/get-baby-product',getBabyProductController)

// get single product 
router.get('/get-baby-product/:slug',getSingleBabyProductController)

//get product photo 
router.get('/baby-product-photo/:pid',getProductPhotoController)

//delete product
router.delete('/baby-product-delete/:pid',deleteBabyProductController)

//update baby and kids product

router.put('/get-baby-product/:pid',requireSignIn,isAdmin,formidable(),updateBabyProductController)
export default router