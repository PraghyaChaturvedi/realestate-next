import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    }, { timestamps: true });

export default citySchema;