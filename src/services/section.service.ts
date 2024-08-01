import { injectable } from "inversify";
import { Section } from "../models/section";

@injectable()
export class SectionService {
    async createSection(sectionData: any) {
        try {
            await Section.create(sectionData)
        } catch (error) {
            throw (error)
        }
    }
}