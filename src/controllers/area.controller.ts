import { inject } from "inversify";
import { controller, httpPost, httpGet, httpDelete } from "inversify-express-utils";
import { TYPES } from "../constants/TYPES";
import { AreaService } from "../services/area.service";
import { Request, Response } from "express";
import { IArea } from "../interfaces/IArea";
import { isValidObjectId } from "mongoose";

@controller("/area")
export class AreaController {
    constructor(@inject<AreaService>(TYPES.AreaServcie) private areaService: AreaService) { }

    @httpPost("/addArea")
    async addArea(req: Request, res: Response) {
        try {
            const { areaName } = req.body;
            await this.areaService.addArea({ areaName })
            res.status(201).json({ status: true, message: "Area Added Successfully" });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }

    @httpGet("/getAllAreas")
    async getAllModules(req: Request, res: Response) {
        try {
            const { page, limit } = req.query;
            const data = await this.areaService.getAllAreas({ page, limit });
            return res.status(201).json({ status: true, data: data })
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message });
        }
    }

    @httpPost("/changeSequence")
    async changeSequence(req: Request, res: Response) {
        try {
            const { areaId, sequence } = req.body;
            if (!isValidObjectId(areaId)) {
                throw new Error("Not Valid Area Id")
            }
            if (!sequence || sequence <=0 ) {
                throw new Error("please enter Sequence")
            }
            await this.areaService.changeSequence({ areaId, sequence } as IArea);
            return res.status(201).json({ status: true, message: "Sequence Changed Succesfully" })
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message });
        }
    }

    @httpDelete("/deleteArea/:id")
    async deleteHomePageData(req: Request, res: Response) {
        try {
            const areaId = req.params.id;
            if (!isValidObjectId(areaId)) {
                throw new Error("Not Valid Area Id")
            }
            await this.areaService.deleteArea(areaId);
            return res.status(201).json({ status: true, message: "Data Deleted Succesfully" })
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message });
        }
    }
}