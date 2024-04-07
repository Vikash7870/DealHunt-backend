import express from 'express'
import { isAdmin, requireSignIn } from './../../middlewares/authMiddleware.js';
import { createMenProductController, deleteMenProductController, getMenProductController, getSingleMenProductController,   menProductPhotoController, updateMenProductController } from '../../controllers/Product/menProductController.js';
import formidable from 'express-formidable'
const router =express.Router()
//Router
//Create men Product

router.post('/create-men-product',requireSignIn,isAdmin,formidable(),createMenProductController)


//get all Product 

router.get('/men-get-Product',getMenProductController)

//get single product

router.get('/men-get-Product/:slug',getSingleMenProductController)

//get product photo
router.get('/men-product-photo/:pid',menProductPhotoController)
//delete product
router.delete('/delete-men-product/:pid',deleteMenProductController)

//update product
router.put('/updateMenProduct/:pid',requireSignIn,isAdmin, formidable(), updateMenProductController)
export default router
