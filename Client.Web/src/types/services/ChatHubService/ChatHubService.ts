export type ConnectionState = "Disconnected" | "Connecting" | "Connected" | "Disconnecting" | "Reconnecting";

export interface ConnectionFacade {
	connectionId: string | null;
	state: ConnectionState;
	start: () => Promise<void>;
	stop: () => Promise<void>;
	send: (messageCode: string, ...args: any[]) => void;
	invoke: (messageCode: string, ...args: any[]) => Promise<void>;
	on: (messageCode: string, handler: (...args: any[]) => void) => void;
	off: (messageCode: string) => void;
	onclose: (callback: (error?: Error) => void) => void;
	onreconnecting: (callback: (error?: Error) => void) => void;
	onreconnected: (callback: (connectionId?: string) => void) => void;
}

export interface ConnectConfig {
	url: string;
}

export type MessageListener = (user: string, message: string) => void;
export interface ChatHubService {
	connect: (config: ConnectConfig) => Promise<void>;
	addMessagesListener: (listener: MessageListener) => string;
	removeMessageListener: (listenerId: string) => boolean;
	sendMessage: (user: string, message: string) => Promise<void>;
}
