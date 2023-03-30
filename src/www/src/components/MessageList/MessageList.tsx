import {Message} from "../Message";
import css from "./message-list.module.css";

interface Props {
	data: DTO.Message[];
}

export const MessageList: React.FC<Props> = ({data}) => {

	return (
		<div className={css.messageList}>
			{data.map((m) => (
				<div key={`${m.author}::${m.sent}`}>
					<Message data={m} />
				</div>
			))}
		</div>
	);
};
