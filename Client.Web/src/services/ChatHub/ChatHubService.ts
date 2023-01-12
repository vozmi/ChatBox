import { createUid } from "@/tools";
import {
	ChatHubConfig,
	ConnectionFacade,
	ChatHubService as IChatHubService,
	MessageListener,
} from "@/types/services/ChatHubService";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { injectable } from "inversify";

@injectable()
export class ChatHubService implements IChatHubService {
	private _connection: ConnectionFacade;
	private _listeners: { [key: string]: MessageListener } = {};

	private async invoke(messageCode: string, ...args: any[]) {
		if (!this._connection) {
			throw "Connection isn't established! Call connect method to create the connection.";
		}

		return await this._connection.invoke(messageCode, ...args);
	}

	constructor(config: ChatHubConfig) {
		const signalrConnection = new HubConnectionBuilder()
			.withUrl(config.url)
			.build();

		this._connection = signalrConnection;
	}

	public get state() {
		return this._connection.state;
	}

	public async connect(): Promise<void> {
		this._connection.on("MessageSent", (user, message) => {
			for (const [_, listener] of Object.entries(this._listeners)) {
				listener({user, message});
			}
		});

		return await this._connection.start();
	}

	public async disconnect(): Promise<void> {
		this._connection.off("MessageSent");
		this._listeners = {};

		return await this._connection.start();
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
