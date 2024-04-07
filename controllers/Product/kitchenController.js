import kitchenModel from "../../models/product/kitchenModel.js";
import slugify from "slugify";
import fs from "fs";

export const createKitchenProductController = async (req,res)=>{
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
        const kitcheProduct = new kitchenModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            kitcheProduct.photo.data = fs.readFileSync(photo.path);
            kitcheProduct.photo.contentType = photo.type;
        }
        await kitcheProduct.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            kitcheProduct,
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

//get all kitchen product
export const getKitchenProductController = async (req,res)=>{
    const getKitchenProduct = await kitchenModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 });
    try {
        res.status(200).send({
            success: true,
            TotalCounnt: getKitchenProduct.length,
            message: "Get all Kitchen Product ",
            getKitchenProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting product",
        });
    }
}

//get single kitchen product
export const getKitchenSingleProductController = async (req,res)=>{
    try {
        const getKitchenProduct = await kitchenModel.findOne({ slug: req.params.slug }).select("-photo");
        res.status(200).send({
            success: true,
            message: 'Get Single Product',
            getKitchenProduct,
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
export const getKitchenPhotoProductController = async (req,res)=>{
    try {
        const productPhoto = await kitchenModel.findById(req.params.pid).select("photo");
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

export const deleteKitchenProductController = async (req,res)=>{
    
    try {
        await kitchenModel.findByIdAndDelete(req.params.pid).select("-photo");
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

export const updateKitchenProductController = async (req,res)=>{
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

        const kitchenProduct = await kitchenModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            kitchenProduct.photo.data = fs.readFileSync(photo.path);
            kitchenProduct.photo.contentType = photo.type;
        }
        await kitchenProduct.save();
        res.status(201).send({
            success: true,
            message: "Product Update Successfully",
            kitchenProduct,
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
