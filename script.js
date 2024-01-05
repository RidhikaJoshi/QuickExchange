function validateInput(input) {
	const value = input.value;
	const cleanedValue = value.replace(/[^\d.]/g, (match) =>
		match === "." ? match : ""
	);
	input.value = cleanedValue;
}
