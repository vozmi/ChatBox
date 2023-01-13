import getDecorators from "inversify-inject-decorators";
import { Container } from "inversify";
import { ChatHubService } from "./ChatHub/ChatHubService";
import { TYPES } from "./TYPES";
import {Store} from "@/data";
import {ServiceOptions} from "./ServiceOptions";

const DIcontainer = new Container();

DIcontainer.bind<ServiceOptions>(TYPES.OPTIONS).to(ServiceOptions).inSingletonScope();
DIcontainer.bind<ChatHubService>(TYPES.CHAT_HUB_SERVICE).to(ChatHubService).inSingletonScope();
DIcontainer.bind<Store>(TYPES.STORE).to(Store).inSingletonScope();

const {lazyInject} = getDecorators(DIcontainer, false);

export { DIcontainer, lazyInject };