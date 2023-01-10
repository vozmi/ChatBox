import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { injectable } from "inversify";
import "reflect-metadata";
import { createUid } from "../tools";

interface ConnectConfig {
	url: string;
}

type MessageListener = (user: string, message: string) => void;

interface ChutHubService {
	connect: (config: ConnectConfig) => Promise<void>;
	addMessageListener: (listener: MessageListener) => string;
	removeMessageListener: (listenerId: string) => boolean;
	sendMessage: (user: string, message: string) => Promise<void>;
}

@injectable()
export class ChatHubService implements ChutHubService {
	private _connection?: HubConnection;
	private _listeners: { [key: string]: MessageListener } = {};

	public async connect(config: ConnectConfig): Promise<void> {
		this._connection = new HubConnectionBuilder()
			.withUrl(config.url)
			.build();

		this._connection.on("MessageSent", (user, message) => {
			for (const [_, listener] of Object.entries(this._listeners)) {
				listener(user, message);
			}
		});

		return await this._connection.start();
	}

	public addMessageListener(listener: MessageListener): string {
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
		return await this._connection?.invoke("SendMessage", user, message);
	}
}
