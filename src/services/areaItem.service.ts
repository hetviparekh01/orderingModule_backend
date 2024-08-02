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
    async getAllAreaItems() {
        try {
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
                }
            ])
            return data
        } catch (error) {
            throw (error)
        }
    }
    async changeSequence(areaItemData: IAreaItem) {
        try {
            const data = await AreaItem.findById(areaItemData.areaItemId)
            await AreaItem.updateMany(
                {
                    areaId: new ObjectId(data?.areaId),
                    sequence: {
                        $gte: areaItemData.sequence,
                        $lt: data?.sequence
                    }
                },
                { $inc: { sequence: 1 } }
            );
            const updatedata=await AreaItem.findByIdAndUpdate(areaItemData.areaItemId,
                { $set: { sequence: areaItemData.sequence } }
            );
            console.log(updatedata);
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