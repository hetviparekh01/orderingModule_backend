import { controller } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { HomeService } from "../services/home.service";
import { HomePage } from "../models/home.model";
import { TYPES } from "../constants/TYPES";

@controller("")
export class HomeController {
    constructor(@inject<HomeService>(TYPES.SectionService) private homeService:HomeService ) { }
    async addHomePageData(req: Request, res: Response) {
        try {
            const { sectionId,sequence } = req.body;
            await this.homeService.addHomePageData({ sectionId, sequence });
            return res.status(201).json({ message: "Section Created Successfully" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getAllModules(req: Request, res: Response){
        try {
            const data=this.homeService.getAllModules();
            return res.status(201).json({ data: data })
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    
    async changeSequence(req: Request, res: Response){
        try { 
            const {sectionId,sequence}=req.body;
            const homepageData=await HomePage.findById(sectionId);
            const currentIndex=homepageData?.sequence;
            const replacedData=await HomePage.findOne({sequence:sequence})
            if(replacedData){
                replacedData.sequence=currentIndex
            }
            const data = this.homeService.changeSequence({ sectionId, sequence });
            return res.status(201).json({ data: data })
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}