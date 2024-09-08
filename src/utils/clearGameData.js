export const clearGameData = () => {
	localStorage.removeItem("cipher");
	localStorage.removeItem("cells");
	localStorage.removeItem("activeRow");
};
