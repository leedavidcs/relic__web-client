import { create } from "jss";
import preset from "jss-preset-default";
import React from "react";
import { createGenerateClassName, JssProvider as Provider } from "react-jss";

export const JssProvider: React.SFC<IWithChildren> = ({ children }) => {
	const styleNode = document.createComment("style-insertion-point");
	const docHead: HTMLHeadElement | null = document.head;

	if (docHead !== null) {
		docHead.insertBefore(styleNode, docHead.firstChild);
	}

	const jss = create({
		insertionPoint: "style-insertion-point",
		plugins: preset().plugins
	});

	return (
		<Provider generateClassName={createGenerateClassName()} jss={jss}>
			{children}
		</Provider>
	);
};
