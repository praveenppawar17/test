import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
        category: {
            type: String,
            required: true,
        },

    });

const category = mongoose.model('category', CategorySchema);
export default category