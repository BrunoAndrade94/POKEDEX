// globais
// pokemon
const pokemon_name = document.querySelector(".pokemon__name");
const pokemon_number = document.querySelector(".pokemon__number");
const pokemon_image = document.querySelector(".pokemon__image");

//formulario
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const button_prev = document.querySelector(".btn_prev");
const button_next = document.querySelector(".btn_next");

let pokemon_atual = 1;

const fetch_pokemon = async (pokemon) => {
	const API_response = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${pokemon}`
	);
	if (API_response.ok) {
		const data = await API_response.json();
		return data;
	}
};

const render_pokemon = async (pokemon) => {
	pokemon_name.innerHTML = "procurando...";

	const data = await fetch_pokemon(pokemon);
	if (!data) {
		pokemon_image.style.display = "none";
		pokemon_number.innerHTML = "0";
		pokemon_name.innerHTML = "ninguém ):";
	} else {
		pokemon_image.style.display = "block";
		pokemon_name.innerHTML = data.name;
		pokemon_number.innerHTML = data.id;
		pokemon_image.src =
			data.sprites.versions["generation-v"][
				"black-white"
			].animated.front_default;
	}
	input.value = "";
};

form.addEventListener("submit", (event) => {
	event.preventDefault();
	render_pokemon(input.value.toLowerCase());
});

button_prev.addEventListener("click", () => {
	pokemon_atual--;
	render_pokemon(pokemon_atual);
});

button_next.addEventListener("click", () => {
	pokemon_atual++;
	render_pokemon(pokemon_atual);
});

render_pokemon(pokemon_atual);
