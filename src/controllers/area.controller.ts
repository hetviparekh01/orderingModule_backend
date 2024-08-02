import { inject } from "inversify";
import { controller, httpPost, httpGet, httpDelete } from "inversify-express-utils";
import { TYPES } from "../constants/TYPES";
import { AreaService } from "../services/area.service";
import { Request, Response } from "express";
import { IArea } from "../interfaces/IArea";

@controller("/area")
export class AreaController {
    constructor(@inject<AreaService>(TYPES.AreaServcie) private areaService: AreaService) { }

    @httpPost("/addArea")
    async addArea(req: Request, res: Response) {
        try {
            const { areaName } = req.body;
            await this.areaService.addArea({ areaName })
            res.status(201).json({ message: "Area Added Successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    @httpGet("/getAllAreas")
    async getAllModules(req: Request, res: Response) {
        try {
            const {page,limit}=req.query;
            const data = await this.areaService.getAllAreas({page,limit});
            return res.status(201).json({ data: data })
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpPost("/changeSequence")
    async changeSequence(req: Request, res: Response) {
        try {
            const { areaId, sequence } = req.body;
            await this.areaService.changeSequence({ areaId, sequence } as IArea);
            return res.status(201).json({ message: "Sequence Changed Succesfully" })
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpDelete("/deleteArea")
    async deleteHomePageData(req: Request, res: Response) {
        try {
            const { areaId } = req.body;
            await this.areaService.deleteArea(areaId);
            return res.status(201).json({ message: "Data Deleted Succesfully" })
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}