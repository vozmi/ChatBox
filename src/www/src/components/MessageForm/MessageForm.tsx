import {ChangeEvent, FormEvent} from "react";
import {useMessageForm} from "./useMessageForm";

interface MessageFormProps {
	initialValue?: string;
	onChange?: (message: string) => void;
	onSubmit?: (message: string) => void;
}

export const MessageForm: React.FC<MessageFormProps> = ({
	initialValue = "",
	onChange = (message) => message,
	onSubmit = (message) => message,
}) => {
	const { message, setMessage, submitForm } = useMessageForm({
		initialValue,
		changeListener(message) {
			onChange(message);
		},
		submitListener(message) {
			onSubmit(message);
		},
	});

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
	};

	const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		submitForm();
	};

	return (
		<form id="newMessageForm" onSubmit={onFormSubmit}>
			<input value={message} onChange={onInputChange} />
			<button type="submit">Send message</button>
		</form>
	);
};
