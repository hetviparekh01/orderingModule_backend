import { injectable } from "inversify";
import { HomePage } from "../models/home.model";
import { Section } from "../models/section";

injectable()
export class HomeService {
    async addHomePageData(homePageData: any) {
        try {
            await HomePage.create(homePageData)
        } catch (error) {
            throw (error)
        }
    }
    async getAllModules() {
        try {
            const data = await Section.find({})
            return data
        } catch (error) {
            throw (error)
        }
    }
    async changeSequence(sectionData:any) {
        try {
            const data =await HomePage.findByIdAndUpdate(sectionData.sectionId,{ sequence: sectionData.sequence })
            return data
        } catch (error) {
            throw (error)
        }
    }
}