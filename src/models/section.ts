import mongoose, { Schema } from "mongoose";

const SectionSchema = new Schema({
    sectionName: {
        type: Number
    }
}, {
    timestamps: true
})

export const Section = mongoose.model('section', SectionSchema)