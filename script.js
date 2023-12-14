const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonDetails = document.querySelector('.pokemon__details');
const pokemonWeight = document.querySelector('.pokemon__weight')
const pokemonTypes = document.querySelector('.pokemon__types')
const pokemonBaseExperience = document.querySelector('.pokemon__base_experience')

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const pokeContainer = document.querySelector('.card__container');

const pokemonCount = 100

let searchPokemon = 1;

async function getPokemon(pokemon) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await response.json();
    createPokemonCard(data)
    return data
    
  } catch (error) {
    console.log(error)
  }
}

async function getPokemons(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    createPokemonCard(data)
  } catch (error) {
    window.alert("algo deu errado!")
  }
}

async function fetchPokemons() {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemons(i)
  }
}

function createPokemonCard(poke) {
  const card = document.createElement("div")
  card.classList.add("card")

  const name = poke.name[0] + poke.name.slice(1)
  const id = poke.id.toString().padStart(3, '0')

  const pokeTypes = poke.types.map(type => type.type.name)

  const pokemonInnerHTML = `
  <div class="card">
    <img class="img__card" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt=${name}>
       <div class="container">
        <p>${id}</p>
        <h2>${name}</h2>
        <p>Types: ${pokeTypes}</p>
      </div>
  </div>
  `
  card.innerHTML = pokemonInnerHTML

  pokeContainer.appendChild(card)
}

fetchPokemons()

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Buscando...';
  pokemonNumber.innerHTML = '';

  const data = await getPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonBaseExperience.innerHTML = `experience level: ${data.base_experience}`
    pokemonName.innerHTML = data.name;
    pokemonWeight.innerHTML = `weight: ${data.weight} kilos`
    pokemonTypes.innerHTML = `type: ${data.types[0].type.name}`
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Pokemon não encontrado';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

renderPokemon(searchPokemon);