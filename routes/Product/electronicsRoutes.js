import express from 'express'
import { isAdmin,requireSignIn } from '../../middlewares/authMiddleware.js'
import formidable from 'express-formidable'
import { createElectronicsProductController, deleteElectronicsProductController, electronicsProductPhotoController, getElectronicsProductController, getSingleElectronicsProductController, updateElectronicsProductController } from '../../controllers/Product/electronicsPController.js'

const router = express.Router()
//route
//create product

router.post('/create-electronics-product',requireSignIn,isAdmin,formidable(),createElectronicsProductController)

//get all product

router.get('/get-all-electronics-product',getElectronicsProductController)

//get single product

router.get('/get-single-electronics-product/:slug',getSingleElectronicsProductController)

//get product photo

router.get('/electronic-product-photo/:pid',electronicsProductPhotoController)
//delete product

router.delete('/delete-electronics-product/:pid',deleteElectronicsProductController)

//update product
router.put('/update-electronics-product/:pid',requireSignIn,isAdmin,formidable(),updateElectronicsProductController)
export default router