import express from 'express'
import { isAdmin,requireSignIn } from '../../middlewares/authMiddleware.js'
import formidable from 'express-formidable'
import { createFoodProductController, deleteFoodProductController, getFoodProductController, getFoodProductPhotoController, getSingleFoodProductController, updateFoodProductController } from '../../controllers/Product/foodController.js'



const router = express.Router()

//Router
//Creati product
router.post('/create-food-product',requireSignIn,isAdmin,formidable(),createFoodProductController)

//get all food products

router.get('/get-food-products',getFoodProductController)

//get single food product 

router.get('/get-single-food-product/:slug',getSingleFoodProductController)

//get photo

router.get('/get-product-photo/:pid',getFoodProductPhotoController)

//delete

router.delete('/delete-food-product/:pid',deleteFoodProductController)

//update

router.put('/update-food-product/:pid',requireSignIn,isAdmin,formidable(),updateFoodProductController)



export default router