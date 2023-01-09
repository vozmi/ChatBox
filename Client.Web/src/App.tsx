import {HubConnectionBuilder} from "@microsoft/signalr";
import { useEffect } from "react";

const connection = new HubConnectionBuilder()
	.withUrl("/hubs/chat")
	.build();

connection.on("MessageSent", (user, message) => {
	console.log(user + " said: \"" + message + "\"");
});

const App = () => {
	useEffect(() => {
		connection.start()
			.then(() => {
				connection.invoke("SendMessage", "testUser", "Hey, Hi!");
			});
	}, []);
	return <div>App</div>;
};

export default App;
