import { ChatHubService, DIcontainer, TYPES } from "@/services";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages";

const App = () => {
	useEffect(() => {
		DIcontainer.rebind<ChatHubService>(
			TYPES.CHAT_HUB_SERVICE
		).toConstantValue(new ChatHubService({ url: "/hubs/chat" }));
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
