import {Store} from "@/data/store";
import {ChatHubService} from "@/services/ChatHub/ChatHubService";
import {TYPES} from "@/services/TYPES";
import {ConnectionState} from "@/types/services/ChatHubService";
import {inject} from "inversify";
import {provide} from "inversify-binding-decorators";
import {computed, makeObservable, observable} from "mobx";

@provide(HomePageVM)
class HomePageVM {
	private _chatHubService!: ChatHubService;

	@observable
	private _currentUser: string;

	@observable
	public messages: DTO.Message[] = [
			{ author: "user1", body: "Hey!", sent: "2023-01-15T12:30:10.1075553Z" },
			{ author: "user2", body: "Hi!", sent: "2023-01-15T12:31:10.1075553Z" },
		];

	@computed
	public get connectionState(): ConnectionState | null {
		return this._chatHubService?.state || null;
	}

	constructor(
		@inject(TYPES.STORE)
			store: Store,
		@inject(TYPES.CHAT_HUB_SERVICE)
			chatHubService: ChatHubService
	) {
		makeObservable(this);

		this._chatHubService = chatHubService;

		this._currentUser = store.user || "anonymus";

		this._chatHubService.addMessagesListener((message) => {
			this.messages.push(message);
		});

		if (this._chatHubService.state === "Disconnected") {
			this._chatHubService.connect();
		}
	}

	async sendMessage(messageText: string) {
		await this._chatHubService.sendMessage(this._currentUser, messageText);
	}
}

export {HomePageVM};

