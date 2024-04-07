import menProductModel from "../../models/product/menProductModel.js";
import slugify from "slugify"
import fs from 'fs'
// import { log } from "console";
export const createMenProductController = async (req, res) => {

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
        const menProduct = new menProductModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            menProduct.photo.data = fs.readFileSync(photo.path);
            menProduct.photo.contentType = photo.type;
        }
        await menProduct.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            menProduct,
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

//get all men products
export const getMenProductController = async (req, res) => {
    const getMenProduct = await menProductModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 });
    try {
        res.status(200).send({
            success: true,
            TotalCounnt: getMenProduct.length,
            message: "Get all Men Product ",
            getMenProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in getting Men Product",
            error: error.message,
        });
    }
};

//get single product
export const getSingleMenProductController = async (req, res) => {
    try {
        const getMenProduct = await menProductModel.findOne({ slug: req.params.slug }).select("-photo");
        res.status(200).send({
            success: true,
            message: 'Get Single Product',
            getMenProduct,
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
export const menProductPhotoController = async (req, res) => {
    try {
        const productPhoto = await menProductModel.findById(req.params.pid).select("photo");
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

export const deleteMenProductController = async (req, res) => {
    try {
        await menProductModel.findByIdAndDelete(req.params.pid).select("-photo");
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


//update men prodct
export const updateMenProductController = async (req, res) => {
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

        const menProduct = await menProductModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            menProduct.photo.data = fs.readFileSync(photo.path);
            menProduct.photo.contentType = photo.type;
        }
        await menProduct.save();
        res.status(201).send({
            success: true,
            message: "Product Update Successfully",
            menProduct,
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