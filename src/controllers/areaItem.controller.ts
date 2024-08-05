import { inject } from "inversify";
import { controller, httpPost, httpGet, httpDelete } from "inversify-express-utils";
import { TYPES } from "../constants/TYPES";
import { Request, Response } from "express";
import { AreaItemService } from "../services/areaItem.service";
import { IAreaItem } from "../interfaces/IAreaItem";
import { isValidObjectId } from "mongoose";

@controller("/areaItem")
export class AreaItemController {
    constructor(@inject<AreaItemService>(TYPES.AreaItemService) private areaItemService: AreaItemService) { }

    @httpPost("/addAreaItem")
    async addArea(req: Request, res: Response) {
        try {
            const { areaId,itemId } = req.body;
            if (!isValidObjectId(areaId) || !isValidObjectId(itemId)) {
                throw new Error("Not Valid Id")
            }
            await this.areaItemService.addAreaItem({ areaId, itemId })
            res.status(201).json({status:true, message: "Area Item Added Successfully" });
        } catch (error) {
            res.status(500).json({status:false, message:error.message });
        }
    }

    @httpGet("/getAllAreaItems")
    async getAllAreaItems(req: Request, res: Response) {
        try {
            const { page, limit } = req.query; 
            const data = await this.areaItemService.getAllAreaItems({ page, limit });
            return res.status(201).json({status:true, data: data })
        } catch (error) {
            return res.status(500).json({status:false, message: error.message });
        }
    }


    @httpGet("/getAllAreaItemsByArea/:id")
    async getAllAreaItemsByArea(req: Request, res: Response) {
        try {
            const { page, limit } = req.query;
            const areaId=req.params.id;
            if (!isValidObjectId(areaId)) {
                throw new Error("Not Valid Area Id")
            }
            const data = await this.areaItemService.getAllAreaItemsByArea(areaId,{ page, limit });
            return res.status(201).json({ status: true, data: data })
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message });
        }
    }

    @httpPost("/changeSequence")
    async changeSequence(req: Request, res: Response) {
        try {
            const { areaItemId, sequence } = req.body;
            if (!isValidObjectId(areaItemId)) {
                throw new Error("Not Valid Area Item Id")
            }
            await this.areaItemService.changeSequence({ areaItemId, sequence } as IAreaItem);
            return res.status(201).json({status:true, message: "Sequence Changed Succesfully" })
        } catch (error) {
            return res.status(500).json({status:false, message: error.message });
        }
    }

    @httpDelete("/deleteAreaItem/:id")
    async deleteHomePageData(req: Request, res: Response) {
        try {
            const  areaItemId  = req.params.id;
            if (!isValidObjectId(areaItemId)) {
                throw new Error("Not Valid Area Item Id")
            }
            await this.areaItemService.deleteAreaItem(areaItemId);
            return res.status(201).json({status:true, message: "Data Deleted Succesfully" })
        } catch (error) {
            return res.status(500).json({status:false, message: error.message });
        }
    }
}