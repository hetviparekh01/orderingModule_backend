import { injectable } from "inversify"
import { Area } from "../models/area.model"
import { IArea } from "../interfaces/IArea"

@injectable()
export class AreaService {
    async addArea(areaData: IArea) {
        try {
            await Area.create(areaData)
        } catch (error) {
            throw (error)
        }
    }
    async getAllAreas(queryParams:any) {
        try {
            const pageSize=Number(queryParams.page) || 1;
            const limit =Number(queryParams.limit) || 5;
            const skip = (pageSize - 1) * limit;
            const data = await Area.aggregate([
                {
                    $lookup: {
                        from: "areaitems",
                        localField: "_id",
                        foreignField: "areaId",
                        let: { itemInfo: "$itemId" },
                        pipeline: [
                            {
                                $lookup: {
                                    from: "items",
                                    localField: "itemId",
                                    foreignField: "_id",
                                    as: "itemDetails"
                                }
                            },
                            {
                                $unwind: {
                                    path: "$itemDetails"
                                }
                            }
                        ],
                        as: "areaItemDetails",
                    }
                },
                {
                    $project: {
                        _id: 1,
                        areaName: 1,
                        sequence: 1,
                        areaItemDetails: {
                            $sortArray: {
                                input: "$areaItemDetails",
                                sortBy: { sequence: 1 }
                            }
                        },
                        itemDetails: 1
                    }
                },
                {
                    $skip:skip,
                },
                {
                    $limit: limit
                },
                {
                    $sort:{sequence:1}
                }
            ])
            return data
        } catch (error) {
            throw (error)
        }
    }
    async changeSequence(areaData: any) {
        try {
            const highestSequenceData=await Area.find().sort({sequence:-1}).limit(1);
            if (!highestSequenceData[0].sequence){
                throw new Error("No data found")
            }
            if (areaData.sequence > highestSequenceData[0].sequence){
                throw new Error("Not a valid sequence")
            }
            const data = await Area.findById(areaData.areaId)
            let sequence = {};
            let inrDcr=1
            if(!data?.sequence){
                throw new Error('Area not found')
            }
            if (areaData.sequence > data?.sequence) {
                sequence={
                    $gt:data?.sequence,
                    $lte:areaData.sequence
                }
                inrDcr=-1
            }else{
                sequence={
                    $gte: areaData.sequence,
                    $lt: data?.sequence
                }
            }
            await Area.updateMany(
                {
                   sequence
                },
                { $inc: { sequence: inrDcr } }
            );
            await Area.findByIdAndUpdate( areaData.areaId,
                { $set: { sequence: areaData.sequence } }
            );
        } catch (error) {
            throw (error)
        }
    }

    async deleteArea(areaId: string) {

        try {
            const data = await Area.findById(areaId)
            await Area.updateMany(
                {
                    sequence: {
                        $gte: data?.sequence,
                    }
                },
                { $inc: { sequence: -1 } }
            );
            await Area.findByIdAndDelete(areaId)
        } catch (error) {
            throw (error)
        }
    }


}