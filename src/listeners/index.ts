import type { App } from "@slack/bolt";
import events from "./events";

const registerListeners = (app: App) => {
	events.register(app);
};

export default registerListeners;
