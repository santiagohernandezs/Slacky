import { App, LogLevel, type StringIndexed } from "@slack/bolt";

/**
 * AppFactory is a factory class that creates a new instance of the App class
 * with the necessary configuration.
 *
 */

// biome-ignore lint/complexity/noStaticOnlyClass: This is a factory class and it's meant to be used as a static class
export class AppFactory {
	static createApp(): App<StringIndexed> {
		return new App({
			signingSecret: process.env.SIGNING_SECRET,
			token: process.env.BOT_TOKEN,
			appToken: process.env.APP_TOKEN,
			socketMode: true,
			port: Number.parseInt(process.env.PORT as string, 10) || 3000,
			logLevel: LogLevel.DEBUG,
		});
	}
}
