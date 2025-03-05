export const getData = (text: string): string[] => {
	const res = text.split("\n");

	return [res[4], res[5]];
};
