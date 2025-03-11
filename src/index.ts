import { AppFactory } from "./app.factory";
import registerListeners from "./listeners";

const app = AppFactory.createApp();

registerListeners(app);

(async () => {
	await app.start();

	app.logger.info("⚡ Bolt app is running!");
})();
