import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { injectable } from "inversify";
import "reflect-metadata";

interface ConnectConfig {
    url: string;
}

@injectable()
export class ChatHubService {
	private _connection?: HubConnection;

	public async conect(config: ConnectConfig): Promise<void> {
		this._connection = new HubConnectionBuilder()
			.withUrl(config.url)
			.build();
		
		this._connection.on("MessageSent", (user, message) => {
			console.log(user + " said: \"" + message + "\"");
		});

		await this._connection.start();
	}
}
