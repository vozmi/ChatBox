import {ChatHubService, TYPES} from "@/services";
import {inject} from "inversify";
import {makeObservable} from "mobx";

export class HomePageVM {
	chatHubService: ChatHubService;

	constructor(
        @inject(TYPES.CHAT_HUB_SERVICE) chatHubService: ChatHubService
	) {
		this.chatHubService = chatHubService;
		makeObservable(this);
	}    
}