// electronics product controller 

import electronicsModel from "../../models/product/electronicsModel.js";
import slugify from "slugify";
import fs from 'fs'

export const createElectronicsProductController =async(req,res)=>{
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
        const electronicsProduct = new electronicsModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            electronicsProduct.photo.data = fs.readFileSync(photo.path);
            electronicsProduct.photo.contentType = photo.type;
        }
        await electronicsProduct.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            electronicsProduct,
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

//get all product

export const getElectronicsProductController = async (req, res) => {
    const getElectronicsProduct = await electronicsModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 });
    try {
        res.status(200).send({
            success: true,
            TotalCounnt: getElectronicsProduct.length,
            message: "Get all Electronics Product ",
            getElectronicsProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in getting Electronics Product",
            error: error.message,
        });
    }
}

//get single product
export const getSingleElectronicsProductController = async (req, res) => {
    try {
        const getElectronicsProduct = await electronicsModel.findOne({ slug: req.params.slug }).select("-photo");
        res.status(200).send({
            success: true,
            message: 'Get Single Product',
            getElectronicsProduct,
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

// get product photo 
export const electronicsProductPhotoController = async (req, res) => {
    try {
        const productPhoto = await electronicsModel.findById(req.params.pid).select("photo");
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
//Delete product

export const deleteElectronicsProductController = async (req, res) => {
    try {
        await electronicsModel.findByIdAndDelete(req.params.pid).select("-photo");
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
export const updateElectronicsProductController = async (req, res) => {
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

        const electronicsProduct = await electronicsModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            electronicsProduct.photo.data = fs.readFileSync(photo.path);
            electronicsProduct.photo.contentType = photo.type;
        }
        await electronicsProduct.save();
        res.status(201).send({
            success: true,
            message: "Product Update Successfully",
            electronicsProduct,
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