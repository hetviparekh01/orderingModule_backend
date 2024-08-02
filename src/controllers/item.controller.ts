import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { ItemService } from "../services/item.service";
import { TYPES } from "../constants/TYPES";
import { Request, Response } from "express";
import { IItem } from "../interfaces/IItem";

@controller("/item")
export class ItemController {
    constructor(@inject<ItemService>(TYPES.ItemService) private itemService: ItemService) { }

    @httpPost("/addItem")
    async createSection(req: Request, res: Response) {
        try {
            const { itemName } = req.body;
            await this.itemService.addItem({ itemName } as IItem);
            return res.status(201).json({ message: "Item Created Successfully" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @httpGet("/getItems")
    async getAllItems(req: Request, res: Response) {
        try {
            const data=await this.itemService.getAllItems();
            return res.status(201).json({ data: data });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}