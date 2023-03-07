import {Message} from "../Message";
import "./message-list.css";

interface Props {
	data: DTO.Message[];
}

export const MessageList: React.FC<Props> = ({data}) => {

	return (
		<div className="message-list">
			{data.map((m) => (
				<div key={`${m.author}::${m.sent}`}>
					<Message data={m} />
				</div>
			))}
		</div>
	);
};
