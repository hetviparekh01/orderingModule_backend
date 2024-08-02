import mongoose, { Schema } from "mongoose";

const AreaSchmea=new Schema({
    areaName:{
        type:String,
        required:true
    },
    areaType:{
        type:String,
        enum:['Banner','Item']
    },
    sequence:{
        type:Number
    }
})


AreaSchmea.pre('save', async function (next) {
    try {
        const data = await Area.find({});
        this.sequence = data.length + 1
    } catch (error) {
        next(error)
    }
})

export const Area = mongoose.model('area', AreaSchmea)
