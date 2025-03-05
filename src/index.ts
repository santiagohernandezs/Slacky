import { AppFactory } from "./app.factory";
import { getData } from "./utils/getData";

const app = AppFactory.createApp();

app.event("reaction_added", async ({ event, client, context }) => {
	try {
		const currentUser = await client.users.info({
			user: event.user,
		});

		const { channels } = await client.conversations.list();

		const history = await client.conversations.history({
			channel: channels?.find((c) => c.name === "general")?.id || "",
		});

		const reactedMessage = history?.messages?.find(
			(m) => m.ts === event.item.ts,
		);

		const data = getData(reactedMessage?.text || "");

		if (event.reaction === "bellhop_bell") {
			client.chat.postMessage({
				channel: "C08FF9VK3GT",
				text: `
		        Hey ${currentUser?.user?.name} logged with ${currentUser?.user?.profile?.email} has reacted! 🎉
		        ${data[0]}
            ${data[1]}
		      `,
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
