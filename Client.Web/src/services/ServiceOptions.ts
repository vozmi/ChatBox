import {fluentProvide} from "inversify-binding-decorators";
import {TYPES} from "./TYPES";

@fluentProvide(TYPES.OPTIONS).inSingletonScope().done()
export class ServiceOptions {
	public chatHubUrl = "/hubs/chat";
}