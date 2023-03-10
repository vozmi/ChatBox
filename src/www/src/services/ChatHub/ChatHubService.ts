import {createUid} from "@/tools";
import {
	ConnectionFacade,
	ChatHubService as IChatHubService,
	MessageListener
} from "@/types/services/ChatHubService";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {inject} from "inversify";
import {fluentProvide} from "inversify-binding-decorators";
import {ServiceOptions} from "../ServiceOptions";
import {TYPES} from "../TYPES";

@fluentProvide(TYPES.CHAT_HUB_SERVICE).inSingletonScope().done()
export class ChatHubService implements IChatHubService {
	private _connection: ConnectionFacade;
	private _listeners: { [key: string]: MessageListener } = {};

	private async invoke(messageCode: string, ...args: any[]) {
		if (!this._connection) {
			throw "Connection isn't established! Call connect method to create the connection.";
		}

		return await this._connection.invoke(messageCode, ...args);
	}

	constructor(
		@inject(TYPES.OPTIONS)
			options: ServiceOptions
	) {
		const signalrConnection = new HubConnectionBuilder()
			.withUrl(options.chatHubUrl)
			.build();

		this._connection = signalrConnection;
	}

	public get state() {
		return this._connection.state;
	}

	public async connect(): Promise<void> {
		this._connection.on("MessageSent", (message: DTO.Message) => {
			for (const [_, listener] of Object.entries(this._listeners)) {
				listener(message);
			}
		});

		return await this._connection.start();
	}

	public async disconnect(): Promise<void> {
		this._connection.off("MessageSent");

		return await this._connection.stop();
	}

	public addMessagesListener(listener: MessageListener): string {
		const uid = createUid();
		this._listeners[uid] = listener;
		return uid;
	}

	public removeMessageListener(listenerId: string): boolean {
		return delete this._listeners[listenerId];
	}

	public async sendMessage(user: string, message: string): Promise<void> {
		return await this.invoke("SendMessage", user, message);
	}
}
