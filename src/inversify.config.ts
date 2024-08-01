import {Container} from "inversify";
import { HomeService } from "./services/home.service";
import { SectionService } from "./services/section.service";
import { ContentService } from "./services/content.service";
import { TYPES } from "./constants/TYPES";

const container=new Container()
container.bind<HomeService>(TYPES.HomeService).to(HomeService)
container.bind<SectionService>(TYPES.SectionService).to(SectionService)
container.bind<ContentService>(TYPES.ContentService).to(ContentService)

export default container