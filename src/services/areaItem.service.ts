import { injectable } from "inversify"
import AreaItem from "../models/areaItem.model"
import { ObjectId } from "mongodb"
import { IAreaItem } from "../interfaces/IAreaItem"

@injectable()
export class AreaItemService {
    async addAreaItem(areaItemData: IAreaItem) {
        try {
            await AreaItem.create(areaItemData)
        } catch (error) {
            throw (error)
        }
    }
    async getAllAreaItems(queryParams:any) {
        try {
            const pageSize = Number(queryParams.page);
            const limit = Number(queryParams.limit);
            const skip = (pageSize - 1) * limit;
            const data = await AreaItem.aggregate([
                {
                    $lookup: {
                        from: "items",
                        localField: "itemId",
                        foreignField: "_id",
                        as: "itemsDetails"
                    }
                },
                {
                    $lookup: {
                        from: "areas",
                        localField: "areaId",
                        foreignField: "_id",
                        as: "areaDetails"
                    }
                },
                {
                    $project: {
                        itemsDetails: { $first: ["$itemsDetails"] },
                        areaDetails: { $first: ["$areaDetails"] },
                        sequence: 1
                    }
                },
                {
                    $skip: skip,
                },
                {
                    $limit: limit
                },
                {
                    $sort:{
                        sequence:1
                    }
                }
            ])
            return data
        } catch (error) {
            throw (error)
        }
    }
    async getAllAreaItemsByArea(areaItemId:string,queryParams: any) {
        try {
            const pageSize = Number(queryParams.page) ||1;
            const limit = Number(queryParams.limit) ||5;
            const skip = (pageSize - 1) * limit;
            const data = await AreaItem.aggregate([
                {
                    $match:{
                        "areaId":new ObjectId(areaItemId)
                    }
                },
                {
                    $lookup: {
                        from: "items",
                        localField: "itemId",
                        foreignField: "_id",
                        as: "itemDetails"
                    }
                },
                {
                    $lookup: {
                        from: "areas",
                        localField: "areaId",
                        foreignField: "_id",
                        as: "areaDetails"
                    }
                },
                {
                    $project: {
                        itemDetails: { $first: ["$itemDetails"] },
                        areaDetails: { $first: ["$areaDetails"] },
                        sequence: 1
                    }
                },
                {
                    $skip: skip,
                },
                {
                    $limit: limit
                },
                {
                    $sort: {
                        sequence: 1
                    }
                }
            ])
            return data
        } catch (error) {
            throw (error)
        }
    }
    async changeSequence(areaItemData: any) {
        try {
            const highestSequenceData = await AreaItem.find().sort({ sequence: -1 }).limit(1);
            if (!highestSequenceData[0].sequence) {
                throw new Error("No data found")
            }
            if (areaItemData.sequence > highestSequenceData[0].sequence) {
                throw new Error("Not a valid sequence")
            }
            const data = await AreaItem.findById(areaItemData.areaItemId)
            let sequence = {};
            let inrDcr = 1
            if (!data?.sequence) {
                throw new Error('Area not found')
            }
            if (areaItemData.sequence > data?.sequence) {
                sequence = {
                    $gt: data?.sequence,
                    $lte: areaItemData.sequence
                }
                inrDcr = -1
            } else {
                sequence = {
                    $gte: areaItemData.sequence,
                    $lt: data?.sequence
                }
            }
            await AreaItem.updateMany(
                {
                    areaId: new ObjectId(data?.areaId),
                    sequence
                },
                { $inc: { sequence: inrDcr } }
            );
            await AreaItem.findByIdAndUpdate(areaItemData.areaItemId,
                { $set: { sequence: areaItemData.sequence } }
            );
        } catch (error) {
            throw (error)
        }
    }

    async deleteAreaItem(areaItemId: string) {
        try {
            const data = await AreaItem.findById(areaItemId)
            await AreaItem.updateMany(
                {
                    areaId: new ObjectId(data?.areaId),
                    sequence: {
                        $gte: data?.sequence,
                    }
                },
                { $inc: { sequence: -1 } }
            );
            await AreaItem.findByIdAndDelete(areaItemId)
        } catch (error) {
            throw (error)
        }
    }


}