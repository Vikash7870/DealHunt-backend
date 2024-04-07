import express from 'express';
import { isAdmin,requireSignIn } from '../../middlewares/authMiddleware.js';
import formidable from 'express-formidable';
import { createToysProductController, deleteToysProductController, getToysPhotoProductController, getToysProductController, getToysSingleProductController, updateToysProductController } from '../../controllers/Product/toysController.js';
const router =express.Router()


//Router
//create product

router.post('/create-Toys-product',requireSignIn,isAdmin,formidable(),createToysProductController)

//get all product 

router.get('/get-all-Toys-product',getToysProductController)

//get single product

router.get('/get-single-Toys-product/:slug',getToysSingleProductController)

//get photo

router.get('/get-Toys-product-photo/:pid',getToysPhotoProductController)

//delete product

router.delete('/delete-Toys-product/:pid',deleteToysProductController)

//update product

router.put('/update-Toys-product/:pid',requireSignIn,isAdmin,formidable(),updateToysProductController)
export default router