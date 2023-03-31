import {ChangeEvent, FormEvent} from "react";
import {useMessageForm} from "./useMessageForm";
import { Button } from "@/lib";

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
		<form id="newMessageForm" style={{display: "flex", gap: 10, marginTop: 10}} onSubmit={onFormSubmit}>
			<input value={message} onChange={onInputChange} />
			<Button type="submit" disabled={message.length === 0}>Send message</Button>
		</form>
	);
};
