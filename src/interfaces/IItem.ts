import mongoose from "mongoose"

export interface IItem{
    itemId:mongoose.Schema.Types.ObjectId
    itemName:string
}