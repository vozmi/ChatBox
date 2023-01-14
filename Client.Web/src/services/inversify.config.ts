import { Store } from "@/data";
import { Container, ContainerModule, interfaces } from "inversify";
import { ChatHubService } from "./ChatHub/ChatHubService";
import { ServiceOptions } from "./ServiceOptions";
import { TYPES } from "./TYPES";

const DIcontainer = new Container();

DIcontainer.bind<ServiceOptions>(TYPES.OPTIONS)
	.to(ServiceOptions)
	.inSingletonScope();

DIcontainer.bind<Store>(TYPES.STORE).to(Store).inSingletonScope();

DIcontainer.bind<ChatHubService>(TYPES.CHAT_HUB_SERVICE)
	.to(ChatHubService)
	.inSingletonScope();

export { DIcontainer };
