import {ReactNode} from "react";
import "./layout.css";

export const Layout: React.FC<{children: ReactNode}> = ({children}) => {
	return (
		<div id="layout">{children}</div>
	);
};
