import mongoose, { Schema } from "mongoose";

const HomePageSchema = new Schema({
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    sequence: {
        type: Number
    }
}, {
    timestamps: true
})

export const HomePage = mongoose.model('homepage', HomePageSchema)