import { Container } from "inversify";
import { ChatHubService } from "./ChatHub/ChatHubService";
import { TYPES } from "./TYPES";
import {Store} from "@/data";

const DIcontainer = new Container();
DIcontainer.bind<ChatHubService>(TYPES.CHAT_HUB_SERVICE).to(ChatHubService).inSingletonScope();
DIcontainer.bind<Store>(TYPES.STORE).to(Store).inSingletonScope();

export { DIcontainer };