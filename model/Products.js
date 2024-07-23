import mongoose, { Schema } from "mongoose";
import Mongoose from 'mongoose'

const products = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    pincodes: {
        type: Array,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    brand: {
        type: String,
        required: true,
    },
    // seller: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // }
}, {timestamps: true})


Mongoose.models = {}

export default Mongoose.model("Products", products);