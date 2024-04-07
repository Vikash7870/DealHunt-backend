import babyProductModel from "../../models/product/babyProductModel.js";

import slugify from "slugify";
import fs from "fs"


// create baby product
export const createBabyProductController = async (req, res) => {

    try {
        const { name, description, price, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        //alidation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:

                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }
        const babyProduct = new babyProductModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            babyProduct.photo.data = fs.readFileSync(photo.path);
            babyProduct.photo.contentType = photo.type;
        }
        await babyProduct.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            babyProduct,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating product",
        });
    }
};

// get all baby product
export const getBabyProductController = async(req,res) =>{
    const getBabyProduct = await babyProductModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 });
    try {
        res.status(200).send({
            success: true,
            TotalCounnt: getBabyProduct.length,
            message: "Get all Baby Product ",
            getBabyProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in getting Baby Product",
            error: error.message,
        });
    }
}


//get single baby Product
export const getSingleBabyProductController= async(req,res)=>{
    
    try {
        const getBabyProduct = await babyProductModel.findOne({ slug: req.params.slug }).select("-photo");
        res.status(200).send({
            success: true,
            message: 'Get Single Product',
            getBabyProduct,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error While getting Single Product',
            error
        })
    }
}
//get product photo
export const getProductPhotoController =async (req,res)=>{
    try {
        const productPhoto = await babyProductModel.findById(req.params.pid).select("photo");
        if (productPhoto.photo.data) {
            res.set("Content-type", productPhoto.photo.contentType);
            return res.status(200).send(productPhoto.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr while getting photo",
            error,
        });
    }
}

//delete baby product
export const deleteBabyProductController =async(req,res)=>{
    try {
        await babyProductModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error whilw deleting product",
            error,
        });
    };
}

//update baby product 

export const updateBabyProductController =async (req,res)=>{
    try {
        const { name, description, price, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        //alidation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:

                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        const babyProduct = await babyProductModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            babyProduct.photo.data = fs.readFileSync(photo.path);
            babyProduct.photo.contentType = photo.type;
        }
        await babyProduct.save();
        res.status(201).send({
            success: true,
            message: "Product Update Successfully",
            babyProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Update product",
        });
    }
}