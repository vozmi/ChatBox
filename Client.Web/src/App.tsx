import { useEffect } from "react";
import { DIcontainer, ChatHubService, TYPES } from "./services";

const App = () => {
	useEffect(() => {
		const chat = DIcontainer.get<ChatHubService>(TYPES.CHAT_HUB_SERVICE);

		chat.addMessageListener((user, message) => {
			console.log(user, message);
		});

		chat.connect({ url: "/hubs/chat" }).then(() => {
			chat.sendMessage("testUser", "Hello!");
		});
	}, []);
	return <div>App</div>;
};

export default App;
