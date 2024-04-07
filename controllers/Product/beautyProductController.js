import beautyProductModel from "../../models/product/beautyProductModel.js";
import slugify from "slugify";
import fs from 'fs'

export const createBeautyProductController =async (req,res)=>{
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
        const beautyProduct = new beautyProductModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            beautyProduct.photo.data = fs.readFileSync(photo.path);
            beautyProduct.photo.contentType = photo.type;
        }
        await beautyProduct.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            beautyProduct,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating product",
        });
    }
}
//get all beauty product
export const getBeautyProductController =async (req,res)=>{
    const getBeautyProduct = await beautyProductModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 });
    try {
        res.status(200).send({
            success: true,
            TotalCounnt: getBeautyProduct.length,
            message: "Get all Beauty Product ",
            getBeautyProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in getting Beauty Product",
            error: error.message,
        });
    }
}

//get single beauty product

export const getSingleBeautyProductController =async(req,res)=>{
    try {
        const getBeautyProduct = await beautyProductModel.findOne({ slug: req.params.slug }).select("-photo");
        res.status(200).send({
            success: true,
            message: 'Get Single Product',
            getBeautyProduct,
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

export const getBeautyProductPhotoController =async(req,res)=>{
    try {
        const productPhoto = await beautyProductModel.findById(req.params.pid).select("photo");
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

//delete beauty product 

export const deleteBeautyProductController =async (req,res)=>{
    try {
        await beautyProductModel.findByIdAndDelete(req.params.pid).select("-photo");
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

//update 

export const updateBeautyProductController =async (req,res)=>{
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

        const beautyProduct = await beautyProductModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            beautyProduct.photo.data = fs.readFileSync(photo.path);
            beautyProduct.photo.contentType = photo.type;
        }
        await beautyProduct.save();
        res.status(201).send({
            success: true,
            message: "Product Update Successfully",
            beautyProduct,
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