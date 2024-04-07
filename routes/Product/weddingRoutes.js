import express from 'express';
import { isAdmin,requireSignIn } from '../../middlewares/authMiddleware.js';
import formidable from 'express-formidable'
import { createWeddingItemController, deleteWeddingItemController, getWeddingAllItemController, getWeddingPhotoController, getWeddingSingleItemController, updateWeddingItemController } from '../../controllers/Product/weddingController.js';

const router = express.Router()
//routes

//create routes
router.post('/create-weeding-item',requireSignIn,isAdmin,formidable(),createWeddingItemController)

//gett all product
router.get('/get-weeding-item',getWeddingAllItemController)

//get single product

router.get('/get-weeding-single-item/:slug', getWeddingSingleItemController)
//get photo

router.get('/get-weeding-photo/:pid', getWeddingPhotoController)

//delete product

router.delete('/delete-weeding-item/:pid',deleteWeddingItemController)

//update product
router.put('/update-weeding-item/:pid',requireSignIn,isAdmin,formidable(), updateWeddingItemController)

export default router