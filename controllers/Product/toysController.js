import toysModel from "../../models/product/toysModel.js";

import slugify from "slugify";
import fs from "fs";

export const createToysProductController = async (req,res)=>{
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
        const toysProduct = new toysModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            toysProduct.photo.data = fs.readFileSync(photo.path);
            toysProduct.photo.contentType = photo.type;
        }
        await toysProduct.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            toysProduct,
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

//get all home product
export const getToysProductController = async (req,res)=>{
    const getToysProduct = await toysModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 });
    try {
        res.status(200).send({
            success: true,
            TotalCounnt: getToysProduct.length,
            message: "Get all Toys Product ",
            getToysProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in getting Toys Product",
            error: error.message,
        });
    }
}

//get single  product
export const getToysSingleProductController = async (req,res)=>{
    try {
        const getToysProduct = await toysModel.findOne({ slug: req.params.slug }).select("-photo");
        res.status(200).send({
            success: true,
            message: 'Get Single Product',
            getToysProduct,
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

//get photo
export const getToysPhotoProductController = async (req,res)=>{
    try {
        const productPhoto = await toysModel.findById(req.params.pid).select("photo");
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

//delete product
export const deleteToysProductController = async (req,res)=>{
    try {
        await toysModel.findByIdAndDelete(req.params.pid).select("-photo");
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

//update product
export const updateToysProductController = async (req,res)=>{
    try {
        const { name, description, price, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        //validation
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

        const toysProduct = await toysModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            toysProduct.photo.data = fs.readFileSync(photo.path);
            toysProduct.photo.contentType = photo.type;
        }
        await toysProduct.save();
        res.status(201).send({
            success: true,
            message: "Product Update Successfully",
            toysProduct,
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