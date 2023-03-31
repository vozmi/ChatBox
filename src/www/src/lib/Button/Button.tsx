import { ReactNode } from "react";
import "./button.css";

interface Props {
    children: ReactNode;
    type?: "submit" | "reset" | "button" | undefined;
    disabled?: boolean;
}

export const Button: React.FC<Props> = (props) => {
	const {children, disabled, type} = props;

	return <button className="cb-btn" disabled={disabled} type={type}>
		<span>{children}</span>
	</button>;
};