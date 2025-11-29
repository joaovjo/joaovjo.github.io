declare module "alpinejs" {
	interface Alpine {
		start(): void;
		store<T>(name: string, value?: T): T;
		effect(callback: () => void): void;
		magic(name: string, callback: () => unknown): void;
		data(name: string, callback: () => Record<string, unknown>): void;
	}

	const Alpine: Alpine;
	export default Alpine;
}

declare module "*.yaml" {
	const content: unknown;
	export default content;
}
