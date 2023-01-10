import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user"
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'product'
                },
                quantity: {
                    type: Number,
                    default : 1
                }
            }
        ]
    },
    { timestamps: true }
);

const cart = mongoose.model('cart', cartSchema);
export default cart