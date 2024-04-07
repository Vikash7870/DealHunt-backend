import express from 'express'
import { isAdmin, requireSignIn } from '../../middlewares/authMiddleware.js'
import formidable from 'express-formidable'
import { createBeautyProductController, deleteBeautyProductController, getBeautyProductController, getBeautyProductPhotoController, getSingleBeautyProductController, updateBeautyProductController } from '../../controllers/Product/beautyProductController.js'

const router =express.Router()

//Router
//create beauty product
router.post('/create-beauty-product',requireSignIn,isAdmin,formidable(),createBeautyProductController)


//get all product

router.get('/get-beauty-product',getBeautyProductController)

//get single product

router.get('/get-single-beauty-product/:slug',getSingleBeautyProductController)

//get product photo
router.get('/get-product-photo/:pid',getBeautyProductPhotoController)
//Delete Product
router.delete('/delete-beauty-product/:pid',deleteBeautyProductController)
//Update 
router.put('/update-beauty-product/:pid',requireSignIn,isAdmin,formidable(),updateBeautyProductController)

export default router