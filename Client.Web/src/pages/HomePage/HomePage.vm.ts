import {Store} from "@/data/store";
import {ChatHubService, DIcontainer, TYPES} from "@/services";
import {ConnectionState, Message} from "@/types/services/ChatHubService";
import {inject, injectable} from "inversify";
import {makeObservable, observable} from "mobx";

@injectable()
class HomePageVM {
	private _chatHubService: ChatHubService;

	@observable
	private _currentUser: string;

	@observable
	public messages: Message[] = [];

	@observable
	public connectionState: ConnectionState;

	@observable
	public newMessage = "";

	constructor(
		@inject(TYPES.STORE)
			store: Store,
		@inject(TYPES.CHAT_HUB_SERVICE)
			chatHubService: ChatHubService,
	) {
		makeObservable(this);
		
		this._chatHubService = chatHubService;

		this._currentUser = store.user || "anonymus";

		this.connectionState = this._chatHubService.state;

		this._chatHubService.addMessagesListener((message) => {
			this.messages.push(message);
		});

		if (this._chatHubService.state === "Disconnected") {
			this._chatHubService.connect();
		}
	}

	async sendMessage() {
		await this._chatHubService.sendMessage(
			this._currentUser,
			this.newMessage
		);
		this.newMessage = "";
	}
}

export const HOME_PAGE_VM = Symbol.for("HOME_PAGE_VM");
DIcontainer.bind<HomePageVM>(HOME_PAGE_VM).to(HomePageVM);

export {HomePageVM};
