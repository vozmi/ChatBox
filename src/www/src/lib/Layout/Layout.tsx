import {ReactNode} from "react";
import css from "./layout.module.css";

export const Layout: React.FC<{children: ReactNode}> = ({children}) => {
	return (
		<div className={css.layout}>{children}</div>
	);
};
