import mongoose from "mongoose";

export interface IAreaItem{
    areaItemId?: mongoose.Schema.Types.ObjectId,
    areaId:mongoose.Schema.Types.ObjectId,
    itemId: mongoose.Schema.Types.ObjectId,
    sequence?:Number
}