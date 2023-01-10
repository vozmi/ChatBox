import { useEffect } from "react";
import { DIcontainer, ChatHubService, TYPES } from "./services";

const App = () => {
	useEffect(() => {
		const chat = DIcontainer.get<ChatHubService>(TYPES.CHAT_HUB_SERVICE);
		
		chat.conect({url: "/hubs/chat"});
	}, []);
	return <div>App</div>;
};

export default App;
