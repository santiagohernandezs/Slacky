// This will make TypeScript recognize the environment variables
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string;
			SIGNING_SECRET: string;
			BOT_TOKEN: `xoxb-${string}-${string}-${string}`;
			APP_TOKEN: `xapp-${string}-${string}-${string}-${string}`;
		}
	}
}

export {};
