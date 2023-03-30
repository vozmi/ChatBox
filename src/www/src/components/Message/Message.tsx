import css from "./message.module.css";

interface Props {
	data: DTO.Message;
}

export const Message: React.FC<Props> = ({ data }) => {
	return (
		<p className={css.message}>
			<span className={css.message__author}>{data.author}</span>
			<span className={css.message__body}>{data.body}</span>
		</p>
	);
};
