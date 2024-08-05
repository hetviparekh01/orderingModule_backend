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
    async getAllItems(queryParams:any) {
        try {
            const pageSize = Number(queryParams.page);
            const limit = Number(queryParams.limit);
            const skip = (pageSize - 1) * limit;
            const data = await Item.aggregate([
                {
                    $skip: skip,
                },
                {
                    $limit: limit
                }
            ])
            return data
        } catch (error) {
            throw (error)
        }
    }

}