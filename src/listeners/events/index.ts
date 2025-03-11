import type { App } from "@slack/bolt";
import { reactionAddedCallback } from "./reaction_added";
import { messageAddedCallback } from "./message_added_Callback";

const register = (app: App) => {
	app.event("reaction_added", reactionAddedCallback);
	app.event("message", messageAddedCallback);
};

export default { register };
