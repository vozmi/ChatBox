import "reflect-metadata";
// reflect-metadata first
import ReactDOM from "react-dom";
import App from "./App";
import {DIcontainer, ServiceOptions, TYPES} from "./services";
import {Store} from "./data";

const options = DIcontainer.get<ServiceOptions>(TYPES.OPTIONS);
options.chatHubUrl = "/hubs/chat";

const store = DIcontainer.get<Store>(TYPES.STORE);
store.user = "vozmi";

ReactDOM.render(<App />, document.getElementById("root"));
