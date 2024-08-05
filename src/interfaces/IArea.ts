import mongoose from "mongoose";

export interface IArea{
    areaId?: mongoose.Schema.Types.ObjectId
    areaName:string,
    sequence?:number
}