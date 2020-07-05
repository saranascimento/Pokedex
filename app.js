const fetchPokemon = () => {
    //fetch: versão moderna para fazer requisição AJAX no browser (ajax- requisições assincronas para obter dados sem recarregar a página)

    //fetch: metodo que ao ser invocado faz uma requisição http e traz dados da url especificada no argumento
    //fetch: retorna uma promise
    //promise: objeto que representa um sucesso ou uma falha de uma operação assincrona
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    // fetch(url)
    //     .then(response => response.json()) // resposta da promise convertida em json
    //     .then(pokemon => { //resultado no console
    //         console.log(pokemon)
    //     })

    const pokemonPromises = []

    for(let count = 1; count <= 150; count++) {
        pokemonPromises.push(fetch(getPokemonUrl(count)).then(response => response.json()))
    }

    //all metodo estatico
    //metodo estatico: método que nao obriga a usar o NEW como prefixo da invocação dele, posibilita encadiar o objeto estatico diretamente no objeto construtor.

    Promise.all(pokemonPromises)
        .then(pokemons => {
            // console.log(pokemons)

            //reduce - reduz um array em outra coisa
            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)

                accumulator += `
                    <li class="card" ${types[0]}>
                        <img class="card-image" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/>
                        <h2 class="card-tittle">${pokemon.id}. ${pokemon.name}</h2>
                        <p class="card-subtittle">${types.join(' | ')}</p>
                    </li>
                `
                return accumulator
            }, '')

            const ul = document.querySelector('[data-js="pokedex"]')

            ul.innerHTML = lisPokemons

            // console.log(lisPokemons)
        })
    
    
}

fetchPokemon()