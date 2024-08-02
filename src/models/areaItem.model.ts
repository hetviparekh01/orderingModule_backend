import mongoose, { Schema } from "mongoose";

const AreaItemSchema=new Schema({
    areaId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    itemId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sequence:{
        type:Number
    }
})

AreaItemSchema.pre('save', async function (next) {
    try {
        const data = await AreaItem.find({ areaId: this.areaId });
        if (data) {
            this.sequence = data.length + 1
        }
    } catch (error) {
        next(error)
    }
})


const AreaItem = mongoose.model('areaItem', AreaItemSchema)

export default AreaItem