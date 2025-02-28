import { AppFactory } from "./app.factory";

const app = AppFactory.createApp();

app.event("reaction_added", async ({ event, client }) => {
	try {
		const currentUser = await client.users.info({
			user: event.user,
		});

		if (event.reaction === "bellhop_bell") {
			client.chat.postMessage({
				channel: "C08FF9VK3GT",
				text: `Hey ${currentUser?.user?.name} logged with ${currentUser?.user?.profile?.email} has reacted!`,
			});
		}
	} catch (error) {
		console.error(error);
	}
});

(async () => {
	await app.start();

	app.logger.info("⚡ Bolt app is running!");
})();
