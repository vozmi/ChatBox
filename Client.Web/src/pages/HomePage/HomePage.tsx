import {MessageForm, MessageList} from "@/components";
import {DIcontainer} from "@/services";
import {observer} from "mobx-react-lite";
import {useState} from "react";
import {HOME_PAGE_VM, HomePageVM} from "./HomePage.vm";

const ObservableMessageList = observer(MessageList);

export const HomePage = observer(() => {
	const [vm] = useState(() => DIcontainer.get<HomePageVM>(HOME_PAGE_VM));

	return (
		<div>
			<ObservableMessageList data={vm.messages} />
			<MessageForm onSubmit={(m) => vm.sendMessage(m)} />
		</div>
	);
});
