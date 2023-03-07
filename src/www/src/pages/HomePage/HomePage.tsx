import {MessageForm, MessageList} from "@/components";
import {Store} from "@/data";
import {Layout} from "@/lib";
import {TYPES} from "@/services/TYPES";
import {DIcontainer} from "@/services/container";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import {HomePageVM} from "./HomePage.vm";
import "./home-page.css";

const ObservableMessageList = observer(MessageList);

export const HomePage = observer(() => {
	const vm = DIcontainer.get(HomePageVM);

	useEffect(() => {
		let username = localStorage.getItem("cb$username");
		
		if (!username) {
			username = window.prompt("Enter your username", "anonymous");

			if (!username) {
				username = "anonymous";
			}

			localStorage.setItem("cb$username", username);
		}
		
		const store = DIcontainer.get<Store>(TYPES.STORE);
		store.user = username;
	}, []);

	return (
		<Layout>
			<div id="home-page">
				<ObservableMessageList data={vm.messages} />
				<MessageForm onSubmit={(m) => vm.sendMessage(m)} />
			</div>
		</Layout>
	);
});
