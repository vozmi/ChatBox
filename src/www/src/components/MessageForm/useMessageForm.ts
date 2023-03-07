import {useState} from "react";

interface UseMessageFormFacade {
    readonly message: string;
    setMessage: (message: string) => void;
    submitForm: () => void;
}

interface UseMessageFormConfig {
	initialValue?: string;
	changeListener?: (message: string) => void;
	submitListener?: (message: string) => void;
}

/**
 * 
 * @param hookConfig - hook configuration
 * @returns hook facade (object to interact with hook)
 */
export const useMessageForm = ({
	initialValue,
	changeListener,
	submitListener,
}: UseMessageFormConfig): UseMessageFormFacade => {
	const [message, setMessage] = useState<string>(initialValue || "");

	return {
		message,
		setMessage(msg: string) {
			setMessage(msg);
			if (changeListener) {
				changeListener(msg);
			}
		},
		submitForm() {
			if (submitListener) {
				submitListener(message);
			}
			setMessage("");
		},
	};
};
