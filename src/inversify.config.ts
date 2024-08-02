import {Container} from "inversify";
import { TYPES } from "./constants/TYPES";
import { AreaService } from "./services/area.service";
import { ItemService } from "./services/item.service";
import { AreaItemService } from "./services/areaItem.service";

const container=new Container()
container.bind<AreaService>(TYPES.AreaServcie).to(AreaService)
container.bind<ItemService>(TYPES.ItemService).to(ItemService)
container.bind<AreaItemService>(TYPES.AreaItemService).to(AreaItemService)

export default container