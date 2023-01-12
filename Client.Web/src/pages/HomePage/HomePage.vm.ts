import { Store } from "@/data/store";
import { ChatHubService, TYPES } from "@/services";
import { ConnectionState, Message } from "@/types/services/ChatHubService";
import { inject } from "inversify";
import { makeObservable, observable } from "mobx";

export class HomePageVM {
	@inject(TYPES.STORE)
	private _store!: Store;

	@inject(TYPES.CHAT_HUB_SERVICE)
	private _chatHubService!: ChatHubService;

	private _currentUser: string;

	@observable
	public messages: Message[] = [];

	@observable
	public connectionState: ConnectionState;

	constructor() {
		makeObservable(this);
		this._currentUser = this._store.user || "anonymus";

		this.connectionState = this._chatHubService.state;

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
