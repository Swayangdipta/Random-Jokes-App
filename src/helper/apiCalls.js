export const getJokes = config => {
    return fetch(`https://v2.jokeapi.dev/joke/${config.categories}?blacklistFlags=${config.blacklistFlags}&type=twopart`).then(response=>response.json()).catch(e=>e)
}