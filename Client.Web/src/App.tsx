import {DIcontainer, ServiceOptions, TYPES} from "@/services";
import {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Store} from "./data";
import {HomePage} from "./pages";

const App = () => {

	/* #region  App configuration */
	useEffect(() => {
		const options = DIcontainer.get<ServiceOptions>(TYPES.OPTIONS);
		options.chatHubUrl = "/hubs/chatHub";

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
