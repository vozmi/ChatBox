import { ChatHubService, DIcontainer, TYPES } from "@/services";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages";
import { Store } from "./data";

const App = () => {

	/* #region  App configuration */
	useEffect(() => {
		DIcontainer.rebind<ChatHubService>(
			TYPES.CHAT_HUB_SERVICE
		).toConstantValue(new ChatHubService({ url: "/hubs/chat" }));

		const store = DIcontainer.get<Store>(TYPES.STORE);
		store.user = "vozmi";
	}, []);
	/* #endregion */

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
