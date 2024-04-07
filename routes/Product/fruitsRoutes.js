import express from 'express';
import { isAdmin,requireSignIn } from '../../middlewares/authMiddleware.js';
import formidable from 'express-formidable';
import { createFruitsProductController, deleteFruitsProductController, getFruitsPhotoProductController, getFruitsProductController, getFruitsSingleProductController, updateFruitsProductController } from '../../controllers/Product/fruitsController.js';
const router =express.Router()


//Router
//create product

router.post('/create-Fruits-product',requireSignIn,isAdmin,formidable(),createFruitsProductController)

//get all product 

router.get('/get-all-Fruits-product',getFruitsProductController)

//get single product

router.get('/get-single-Fruits-product/:slug',getFruitsSingleProductController)

//get photo

router.get('/get-Fruits-product-photo/:pid',getFruitsPhotoProductController)

//delete product

router.delete('/delete-Fruits-product/:pid',deleteFruitsProductController)

//update product

router.put('/update-Fruits-product/:pid',requireSignIn,isAdmin,formidable(),updateFruitsProductController)
export default router