import express from 'express';
import { isAdmin,requireSignIn } from '../../middlewares/authMiddleware.js';
import formidable from 'express-formidable';
import { createHomeProductController, deleteHomeProductController, getHomePhotoProductController, getHomeProductController, getHomeSingleProductController, updateHomeProductController } from '../../controllers/Product/homeController.js';
const router =express.Router()


//Router
//create product

router.post('/create-Home-product',requireSignIn,isAdmin,formidable(),createHomeProductController)

//get all product 

router.get('/get-all-Home-product',getHomeProductController)

//get single product

router.get('/get-single-Home-product/:slug',getHomeSingleProductController)

//get photo

router.get('/get-Home-product-photo/:pid',getHomePhotoProductController)

//delete product

router.delete('/delete-Home-product/:pid',deleteHomeProductController)

//update product

router.put('/update-Home-product/:pid',requireSignIn,isAdmin,formidable(),updateHomeProductController)
export default router