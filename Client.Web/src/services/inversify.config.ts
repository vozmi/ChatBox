import { Container } from "inversify";
import { ChatHubService } from "./chatHubService";
import { TYPES } from "./TYPES";

const DIcontainer = new Container();
DIcontainer.bind<ChatHubService>(TYPES.CHAT_HUB_SERVICE).to(ChatHubService).inSingletonScope();

export { DIcontainer };