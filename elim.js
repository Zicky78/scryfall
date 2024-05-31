const button = document.getElementById("randomButton");
const output = document.getElementById("cardResult");
const input = document.getElementById("input");

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

button.addEventListener("click", (e) => {
	e.preventDefault();
	output.innerHTML = "";

	inputValue = input.value;
	inputValue = inputValue.replace(/ /g, "+");

	sleep(300).then(() => {
		getCard(inputValue).then((cards) => {
			console.log(cards);

			cards.data.forEach((card) => {
				const cardImage = document.createElement("img");
				if (card.image_uris != undefined) {
					cardImage.src = card.image_uris.normal;
				} else if (card.card_faces != undefined) {
					cardImage.src = card.card_faces[0].image_uris.normal;
				}
				$(cardImage).hide().appendTo(output).fadeIn(700);
			});

			createNextPage(cards);
		});
	});
});

function createNextPage(cards) {
	const nextPage = document.createElement("button");
	nextPage.innerHTML = "Next Page";
	nextPage.id = "nextPage";
	output.appendChild(nextPage);

	nextPage.addEventListener(
		"click",
		(e) => {
			e.preventDefault();
			output.innerHTML = "";
			console.log(output.innerHTML);
			sleep(300).then(() => {
				getNextPage(cards.next_page).then((cards) => {
					console.log(cards);

					cards.data.forEach((card) => {
						const cardImage = document.createElement("img");
						if (card.image_uris != undefined) {
							cardImage.src = card.image_uris.normal;
						} else if (card.card_faces != undefined) {
							cardImage.src = card.card_faces[0].image_uris.normal;
						}
						$(cardImage).hide().appendTo(output).fadeIn(700);
					});
					createNextPage(cards);
				});
			});
		},
		{ once: true }
	); // Add the event listener with the { once: true } option
}

//img eventlistener that removes the card from object when clicked
document.addEventListener("click", (e) => {
	e.preventDefault();
	if (e.target.tagName === "IMG") {
		e.target.remove();
	}
});

async function getCard(inputValue) {
	const response = await fetch(
		"https://api.scryfall.com/cards/search?q=" + inputValue
	);
	const data = await response.json();
	return data;
}

async function getNextPage(url) {
	const response = await fetch(url);
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

// is:commander f:c -id=simic -set:who -set:40k -set:ltr -set:ltc -set:pltr cmc<7 -o:"landfall" -o:"+1/+1 counter" -o:"destroy all" -set:pip -t:background -t:planeswalker -t:praetor id>1

//lilah
