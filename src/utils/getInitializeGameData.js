export const getInitializeGameData = areEmptyCells => {
	return {
		cipher:
			JSON.parse(String(localStorage.getItem("cipher"))) ||
			(areEmptyCells
				? [
						Math.floor(Math.random() * 9),
						Math.floor(Math.random() * 9),
						Math.floor(Math.random() * 9),
						Math.floor(Math.random() * 9),
						Math.floor(Math.random() * 9),
				  ]
				: [
						Math.floor(Math.random() * 8 + 1),
						Math.floor(Math.random() * 8 + 1),
						Math.floor(Math.random() * 8 + 1),
						Math.floor(Math.random() * 8 + 1),
						Math.floor(Math.random() * 8 + 1),
				  ]),
		cells: JSON.parse(String(localStorage.getItem("cells"))) || [
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
		],
		activeRow: Number(localStorage.getItem("activeRow")),
	};
};
