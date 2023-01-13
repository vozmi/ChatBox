import {injectable} from "inversify";

@injectable()
export class ServiceOptions {
	public chatHubUrl = "/hubs/chat";
}