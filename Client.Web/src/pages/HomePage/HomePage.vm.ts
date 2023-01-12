import {ChatHubService, TYPES} from "@/services";
import {ConnectionState, Message} from "@/types/services/ChatHubService";
import {inject} from "inversify";
import {makeObservable, observable} from "mobx";

export class HomePageVM {
	@observable
	public chatHubService: ChatHubService;

	@observable
	public messages: Message[] = [];

	@observable
	public connectionState: ConnectionState;

	constructor(
		@inject(TYPES.CHAT_HUB_SERVICE) chatHubService: ChatHubService
	) {
		this.chatHubService = chatHubService;
		this.connectionState = chatHubService.state;
		makeObservable(this);
	}
}
