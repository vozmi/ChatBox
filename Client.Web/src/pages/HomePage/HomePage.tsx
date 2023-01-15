import {MessageForm} from "@/components";
import {DIcontainer} from "@/services";
import {observer} from "mobx-react-lite";
import {useState} from "react";
import {HOME_PAGE_VM, HomePageVM} from "./HomePage.vm";

export const HomePage = observer(() => {
	const [vm] = useState(() => DIcontainer.get<HomePageVM>(HOME_PAGE_VM));

	return (
		<div>
			{vm.messages.map((m) => (
				<p key={m.body + ":::" + m.author}>
					{m.body} ({m.author})
				</p>
			))}
			<MessageForm onSubmit={(m) => vm.sendMessage(m)} />
		</div>
	);
});
