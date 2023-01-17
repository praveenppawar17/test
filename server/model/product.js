import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    size: {
        type: String
    },
    price: {
        type: Number,
        required: true
    }
},
    { timestamps: true }
);

ProductSchema.index({title: "text", description:"text"})

const product = mongoose.model('product', ProductSchema);
export default product