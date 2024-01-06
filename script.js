function validateInput(input) {
	const value = input.value;
	const cleanedValue = value.replace(/[^\d.]/g, (match) =>
		match === "." ? match : ""
	);
	input.value = cleanedValue;
}

let country1 = document.getElementById("country1");
let country2 = document.getElementById("country2");
let exchange = document.getElementById("exchange-rates");
let convert = document.getElementById("convert");
let answer = document.getElementById("answer");
let input = document.getElementById("input");
let reverse = document.getElementById("reverse");
let value1 = country1.value;
let value2 = country2.value;
let result;

country1.addEventListener("change", () => {
	value1 = country1.value;
	value1 = value1.slice(0, 3);
	console.log(value1);
});
country2.addEventListener("change", () => {
	value2 = country2.value;
	value2 = value2.slice(0, 3);
	console.log(value2);
});

value1 = value1.slice(0, 3);
console.log(value1);
value2 = value2.slice(0, 3);
console.log(value2);

async function logRates() {
	try {
		const response = await fetch(
			"/api/latest?access_key=e9528447911c5638769395778e0e8287"
		);
		result = await response.json();
		return result;
	} catch (error) {
		console.error("Error fetching exchange rates:", error);
		throw error; // Rethrow the error to be caught in the caller
	}
}
logRates();

logRates().then((result) => {
	if (result && result.rates) {
		let r = (result.rates[value2] / result.rates[value1]).toFixed(4);
		exchange.innerHTML = `1 ${country1.value} = ${r} ${country2.value}`;
	} else {
		console.log("hi");
		console.error("Error fetching exchange rates.");
	}
});

convert.addEventListener("click", () => {
	logRates().then(() => {
		if (result && result.rates) {
			answer.innerText = "0";
			let r = (result.rates[value2] / result.rates[value1]).toFixed(4);
			exchange.innerHTML = `1 ${country1.value} = ${r} ${country2.value}`;
			if (input.value != "") {
				answer.innerText = (Number.parseFloat(input.value) * r).toFixed(4);
			}
		} else {
			console.error("Error fetching exchange rates.");
		}
	});
});

reverse.addEventListener("click", () => {
	let temp = country1.value;
	country1.value = country2.value;
	country2.value = temp;
	value1 = country1.value;
	value1 = value1.slice(0, 3);
	value2 = country2.value;
	value2 = value2.slice(0, 3);
	input.value = "";
	answer.innerText = "";
});
