import type { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import { GeneralChat } from "../../utils/consts";

export const messageAddedCallback = async ({
	event,
	client,
	logger,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"message">) => {
	const { channels } = await client.conversations.list();
	const generalChannel = channels?.find((c) => c.name === GeneralChat);
	const usersWithRelatedTags = [];

	if (!generalChannel) {
		logger.error("General channel not found");
	}

	const teamInfo = await client.team.info();
	const teamTagField = await client.team.profile.get().then((res) => {
		return res.profile?.fields?.find((f) => f.label === "Tags");
	});

	const usersInTeam = await client.users.list({
		team_id: teamInfo?.team?.id,
	});
	const members = usersInTeam?.members
		?.filter((m) => m.name !== "slackbot" && m.name !== "slacky")
		.map((member) => {
			return {
				id: member.id,
				name: member.name,
			};
		}) as { id: string; name: string }[];

	for (const member of members) {
		const userProf = await client.users.profile.get({
			user: member.id,
		});

		const userTags =
			userProf?.profile?.fields?.[teamTagField?.id as string]?.value;

		if (userTags) {
			usersWithRelatedTags.push({
				id: member.id,
				name: member.name,
				tags: userTags,
			});
		}
	}

	const reactedInGeneral = event.channel === generalChannel?.id;

	if (reactedInGeneral) {
		console.log("Message in general channel");

		const channel = await client.conversations.open({
			users: usersWithRelatedTags.map((u) => u.id).join(","),
		});

		client.chat.postMessage({
			channel: channel?.channel?.id as string,
			text: "Hey! has posted a message in the general channel.",
		});

		console.log("event", event);
	}
};
