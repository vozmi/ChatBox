import { Store } from "@/data/store";
import { ChatHubService, TYPES } from "@/services";
import { ConnectionState, Message } from "@/types/services/ChatHubService";
import { inject } from "inversify";
import { makeObservable, observable } from "mobx";

export class HomePageVM {
	private _currentUser: string;

	@observable
	private _chatHubService: ChatHubService;

	@observable
	public messages: Message[] = [];

	@observable
	public connectionState: ConnectionState;

	constructor(
		@inject(TYPES.STORE) store: Store,
		@inject(TYPES.CHAT_HUB_SERVICE) chatHubService: ChatHubService
	) {
		makeObservable(this);
		this._currentUser = store.user || "anonymus";
		this._chatHubService = chatHubService;
		this.connectionState = chatHubService.state;
		this._chatHubService.addMessagesListener((message) => {
			this.messages.push(message);
		});
	}

	async sendMessage(message: string) {
		return await this._chatHubService.sendMessage(
			this._currentUser,
			message
		);
	}
}
