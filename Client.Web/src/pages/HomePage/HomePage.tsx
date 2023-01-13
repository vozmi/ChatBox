import { useState } from "react";
import {HOME_PAGE_VM, HomePageVM} from "./HomePage.vm";
import {DIcontainer} from "@/services";

export const HomePage = () => {
	const [vm] = useState(() => DIcontainer.get<HomePageVM>(HOME_PAGE_VM));

	return (
		<div>
			{vm.messages.map((m) => (
				<p key={m.message + ":::" + m.user}>
					{m.message} ({m.user})
				</p>
			))}
			<button onClick={() => vm.sendMessage("Hey!")}>Send message</button>
		</div>
	);
};
