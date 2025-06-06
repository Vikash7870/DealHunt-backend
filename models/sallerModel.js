import mongoose from "mongoose";


const sellerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: {},
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
        shopType: {
            type: String,
            required: true,
            trim: true,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
        role: {
            type: Number,
            default: 1,
        },

    },
    { timestamps: true }
)
export default mongoose.model('seller', sellerSchema);