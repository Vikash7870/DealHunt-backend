import womenProductModel from "../../models/product/womenProductModel.js"
import slugify from "slugify"
import fs from 'fs'
import { log } from "console";
export const createWomenProductController = async (req, res) => {

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

        const womenProduct = new womenProductModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            womenProduct.photo.data = fs.readFileSync(photo.path);
            womenProduct.photo.contentType = photo.type;
        }
        await womenProduct.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            womenProduct,
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
//get women products
export const getWomenProductController = async (req, res) => {
    const getWomenProduct = await womenProductModel.find({}).select("-photo").limit(10000).sort({ createdAt: -1 });
    try {
        res.status(200).send({
            success: true,
            TotalCounnt: getWomenProduct.length,
            message: "Get all women Product ",
            getWomenProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in getting women Product",
            error: error.message,
        });
    }
};


//get single product
export const getSingleWomenProductController = async (req, res) => {
    try {
        const getWomenProduct = await womenProductModel.findOne({ slug: req.params.slug }).select("-photo");
        res.status(200).send({
            success: true,
            message: 'Get Single Product',
            getWomenProduct,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error While getting Single Product',
            error
        })
    }
};
// get photo
export const womenProductPhotoController = async (req, res) => {
    try {
        const productPhoto = await womenProductModel.findById(req.params.pid).select("photo");
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
};

//Delete Product

export const deleteWomenProductController = async (req, res) => {
    try {
        await womenProductModel.findByIdAndDelete(req.params.pid).select("-photo");
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

// update product 
export const updateWomenProductController = async (req, res) => {
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

        const womenProduct = await womenProductModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            womenProduct.photo.data = fs.readFileSync(photo.path);
            womenProduct.photo.contentType = photo.type;
        }
        await womenProduct.save();
        res.status(201).send({
            success: true,
            message: "Product Update Successfully",
            womenProduct,
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