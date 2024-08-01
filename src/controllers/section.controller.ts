import { controller } from "inversify-express-utils";
import { Request, Response } from "express";
import { SectionService } from "../services/section.service";
import { inject } from "inversify";
import { TYPES } from "../constants/TYPES";

@controller("")
export class SectionController{
    constructor(@inject<SectionService>(TYPES.SectionService) private sectionService:SectionService){}
    async createSection(req: Request, res: Response){
        try {
            const {name} =req.body;
            await this.sectionService.createSection({name});
            return res.status(201).json({message:"Section Created Successfully"});
        } catch (error) {
            return res.status(201).json({ message: error.message});
        }
    }
}