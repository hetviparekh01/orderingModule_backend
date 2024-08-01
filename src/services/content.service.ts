import { injectable } from "inversify";
import Content from "../models/content.model";

@injectable()
export class ContentService{
    async createContent(contentData:any){
        try {
            await Content.create(contentData)
        } catch (error) {
            throw(error)
        }
    }
}