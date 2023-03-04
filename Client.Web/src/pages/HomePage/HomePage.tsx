import {MessageForm, MessageList} from "@/components";
import {DIcontainer} from "@/services/container";
import {observer} from "mobx-react-lite";
import {HomePageVM} from "./HomePage.vm";
import "./home-page.css";

const ObservableMessageList = observer(MessageList);

export const HomePage = observer(() => {
	const vm = DIcontainer.get(HomePageVM);

	return (
		<div id="home-page">
			<ObservableMessageList data={vm.messages} />
			<MessageForm onSubmit={(m) => vm.sendMessage(m)} />
		</div>
	);
});
