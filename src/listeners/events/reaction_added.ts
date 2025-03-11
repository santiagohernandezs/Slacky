import { BellhopReaction, GeneralChat, LogChat } from "../../utils/consts";
import type { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import { getData } from "../../utils/helpers";

export const reactionAddedCallback = async ({
	event,
	client,
	logger,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"reaction_added">) => {
	try {
		const { channels } = await client.conversations.list();
		const generalChannel = channels?.find((c) => c.name === GeneralChat);

		if (!generalChannel) {
			logger.error("General channel not found");
		}

		const currentUser = await client.users.info({
			user: event.user,
		});

		const history = await client.conversations.history({
			channel: generalChannel?.id as string,
		});
		const reactedMessage = history?.messages?.find(
			(m) => m.ts === event.item.ts,
		);

		const data = getData(reactedMessage?.text as string);
		const reactedInGeneral = event.item.channel === generalChannel?.id;
		const logChannel = channels?.find((c) => c.name === LogChat);

		if (reactedInGeneral && event.reaction === BellhopReaction) {
			client.chat.postMessage({
				channel: logChannel?.id as string,
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
};
