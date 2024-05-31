const button = document.getElementById("randomButton");
const output = document.getElementById("cardResult");
const input = document.getElementById("input");

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

button.addEventListener("click", (e) => {
	e.preventDefault();
	output.innerHTML = "";
	const cardImage = document.createElement("img");

	// const cardImage2 = document.createElement("img");

	// const cardImage3 = document.createElement("img");

	inputValue = input.value;
	inputValue = inputValue.replace(/ /g, "+");

	sleep(300).then(() => {
		getCard(inputValue).then((card) => {
			console.log(card);

			cardImage.src = card.image_uris.normal;
		});
	});
	$(cardImage).hide().appendTo(output).fadeIn(700);

	// sleep(300).then(() => {
	// 	getCard(inputValue).then((card) => {
	// 		console.log(card);

	// 		cardImage2.src = card.image_uris.normal;

	// 		$(cardImage2).hide().appendTo(output).fadeIn(1000);
	// 	});
	// });

	// sleep(300).then(() => {
	// 	getCard(inputValue).then((card) => {
	// 		console.log(card);

	// 		cardImage3.src = card.image_uris.normal;

	// 		$(cardImage3).hide().appendTo(output).fadeIn(1000);
	// 	});
	// });
});

async function getCard(inputValue) {
	const response = await fetch(
		"https://api.scryfall.com/cards/random?q=" + inputValue
	);
	const data = await response.json();
	return data;
}

$("head").append(
	'<link href="//fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet" type="text/css">'
);

$("input").focus(function (event) {
	$(this).closest(".float-label-field").addClass("float").addClass("focus");
});

$("input").blur(function () {
	$(this).closest(".float-label-field").removeClass("focus");
	if (!$(this).val()) {
		$(this).closest(".float-label-field").removeClass("float");
	}
});
