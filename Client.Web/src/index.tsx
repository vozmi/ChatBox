import ReactDOM from "react-dom";
import App from "./App";
import {Store} from "./data";
import {ServiceOptions} from "./services/ServiceOptions";
import {TYPES} from "./services/TYPES";
import {DIcontainer} from "./services/container";

const options = DIcontainer.get<ServiceOptions>(TYPES.OPTIONS);
options.chatHubUrl = "/hubs/chat";

const store = DIcontainer.get<Store>(TYPES.STORE);
store.user = "vozmi";

ReactDOM.render(<App />, document.getElementById("root"));
