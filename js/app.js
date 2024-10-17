const URL = 'https://pokeapi.co/api/v2/pokemon/';

//Elementos del html
const $search = document.querySelector("#search");
const $boxCard = document.querySelector(".boxCard");
const $send = document.querySelector("#send")

//variables para el temporizador
let timer;


// Función para mostrar un mensaje de error
function showError(message) {
    $boxCard.innerHTML = `<p class="notFound">${message}</p>`;
}

// Función para buscar un Pokémon aleatorio
async function searchRandomPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1;
    await searchPokemon(randomId);
}

 //Funcion para reiniciar el temporizador
 function resetTimer() {
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(() => {
        searchRandomPokemon();
    }, 30000);
}

// Función para buscar un Pokémon
async function searchPokemon(pokemonId) {
    try {
        // Realizar una petición a la API de PokeAPI
        const response = await fetch(URL + pokemonId);
        if (!response.ok) {
            showError(`Pokemon not found...`);
            return;
        }

        const data = await response.json();

        // Mostrar los datos del Pokémon en el contenedor de resultados
        $boxCard.innerHTML = 
        `
            <h2>${data.name.toUpperCase()}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>Id: ${data.id}</p>
            <p>Height: ${data.height / 10}m</p>
            <p>Weight: ${data.weight / 10}kg</p>
        `;
    } catch (error) {
        showError('Pokemon not found...');
        console.error(error);
    }
}

// Iniciar el temporizador
resetTimer();

// Buscar un Pokémon inicial
setTimeout(searchRandomPokemon, 0);


$send.addEventListener('click', () => {
    resetTimer(); // Reiniciar el temporizador
    const searchedPokemon = $search.value.toLowerCase();
    searchPokemon(searchedPokemon); // Buscar el Pokémon
});