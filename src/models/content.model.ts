import mongoose, { Schema } from "mongoose";

const ContentSchema=new Schema({
    sectionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'section'
    },
    name:{
        type:String
    },
    sequence:{
        type :Number
    }
},{
    timestamps:true
})

const Content=mongoose.model('content',ContentSchema)

export default Content