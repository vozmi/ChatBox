import { ChatHubService, DIcontainer, TYPES } from "@/services";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {HomePage} from "./pages";

const App = () => {
	useEffect(() => {
		const chat = DIcontainer.get<ChatHubService>(TYPES.CHAT_HUB_SERVICE);

		chat.addMessagesListener((user, message) => {
			console.log(user, message);
		});

		chat.connect({ url: "/hubs/chat" }).then(() => {
			chat.sendMessage("testUser", "Hello!");
		});
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
