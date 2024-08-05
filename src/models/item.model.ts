import mongoose, { Schema } from "mongoose";

const ItemSchema=new Schema({
    itemName:{
        type:String,
        required:true,
    }
})

const Item = mongoose.model('item', ItemSchema)

export default Item