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
            const pageSize=Number(queryParams.page);
            const limit =Number(queryParams.limit);
            const skip = (pageSize - 1) * limit;
            const data = await Area.aggregate([
                {
                    $skip:skip,
                },
                {
                    $limit: limit
                }
            ])
            return data
        } catch (error) {
            throw (error)
        }
    }
    async changeSequence(areaData: IArea) {
        try {
            const data = await Area.findById(areaData.areaId)
            await Area.updateMany(
                {
                    sequence: {
                        $gte: areaData.sequence,
                        $lt: data?.sequence
                    }
                },
                { $inc: { sequence: 1 } }
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