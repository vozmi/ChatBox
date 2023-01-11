import { createUid } from "@/tools";
import {
	ConnectConfig,
	ConnectionFacade,
	ChatHubService as IChatHubService,
	MessageListener,
} from "@/types/services/ChatHubService";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class ChatHubService implements IChatHubService {
	private _connection?: ConnectionFacade;
	private _listeners: { [key: string]: MessageListener } = {};

	public async connect(config: ConnectConfig): Promise<void> {
		const signalrConnection = new HubConnectionBuilder()
			.withUrl(config.url)
			.build();

		this._connection = signalrConnection;

		this._connection.on("MessageSent", (user, message) => {
			for (const [_, listener] of Object.entries(this._listeners)) {
				listener(user, message);
			}
		});

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
		if (!this._connection) {
			throw "Cannot send message! Connection is not established!";
		}
		return await this._connection?.invoke(
			"SendMessage",
			user,
			message
		);
	}
}
