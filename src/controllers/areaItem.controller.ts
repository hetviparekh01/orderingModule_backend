import { inject } from "inversify";
import { controller, httpPost, httpGet, httpDelete } from "inversify-express-utils";
import { TYPES } from "../constants/TYPES";
import { Request, Response } from "express";
import { AreaItemService } from "../services/areaItem.service";
import { IAreaItem } from "../interfaces/IAreaItem";

@controller("/areaItem")
export class AreaItemController {
    constructor(@inject<AreaItemService>(TYPES.AreaItemService) private areaItemService: AreaItemService) { }

    @httpPost("/addAreaItem")
    async addArea(req: Request, res: Response) {
        try {
            const { areaId,itemId } = req.body;
            await this.areaItemService.addAreaItem({ areaId, itemId })
            res.status(201).json({ message: "Area Item Added Successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    @httpGet("/getAllAreaItems")
    async getAllModules(req: Request, res: Response) {
        try {
            const data = await this.areaItemService.getAllAreaItems();
            return res.status(201).json({ data: data })
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpPost("/changeSequence")
    async changeSequence(req: Request, res: Response) {
        try {
            const { areaItemId, sequence } = req.body;
            await this.areaItemService.changeSequence({ areaItemId, sequence } as IAreaItem);
            return res.status(201).json({ message: "Sequence Changed Succesfully" })
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpDelete("/deleteAreaItem")
    async deleteHomePageData(req: Request, res: Response) {
        try {
            const { areaItemId } = req.body;
            await this.areaItemService.deleteAreaItem(areaItemId);
            return res.status(201).json({ message: "Data Deleted Succesfully" })
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}