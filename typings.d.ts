declare module "*.svg" {
	const content: any;
	export default content;
}

declare interface IAction {
	type: string;
	payload?: any;
	meta?: any;
}

declare interface IWithChildren {
	children: React.ReactNode;
}
