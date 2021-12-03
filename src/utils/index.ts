export const add = (...nums: number[]): number => {
	return nums.reduce((sum, item) => {
		return sum + item;
	}, 0);
};
