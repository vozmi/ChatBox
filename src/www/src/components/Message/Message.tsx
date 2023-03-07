import "./message.css";

interface Props {
	data: DTO.Message;
}

export const Message: React.FC<Props> = ({ data }) => {
	return (
		<p className="message">
			<span className="message__author">{data.author}</span>
			<span className="message__body">{data.body}</span>
		</p>
	);
};
