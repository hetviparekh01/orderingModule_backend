import { injectable } from "inversify"
import Item from "../models/item.model"
import { IItem } from "../interfaces/IItem"

@injectable()
export class ItemService {
    async addItem(itemData: IItem) {
        try {
            await Item.create(itemData)
        } catch (error) {
            throw (error)
        }
    }
    async getAllItems() {
        try {
            const data = await Item.find({})
            return data
        } catch (error) {
            throw (error)
        }
    }

}