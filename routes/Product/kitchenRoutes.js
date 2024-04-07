import express from 'express';
import { isAdmin,requireSignIn } from '../../middlewares/authMiddleware.js';
import formidable from 'express-formidable';
import { createKitchenProductController , deleteKitchenProductController, getKitchenPhotoProductController, getKitchenProductController, getKitchenSingleProductController, updateKitchenProductController } from '../../controllers/Product/kitchenController.js';
const router = express.Router();

//Router
//create product

router.post('/create-kitchen-product',requireSignIn,isAdmin,formidable(),createKitchenProductController)

//get all product 

router.get('/get-all-kitchen-product',getKitchenProductController)

//get single product

router.get('/get-single-kitchen-product/:slug',getKitchenSingleProductController)

//get photo

router.get('/get-kitchen-product-photo/:pid',getKitchenPhotoProductController)

//delete product

router.delete('/delete-kitchen-product/:pid',deleteKitchenProductController)

//update product

router.put('/update-kitchen-product/:pid',requireSignIn,isAdmin,formidable(),updateKitchenProductController)
export default router;