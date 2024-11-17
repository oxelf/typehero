let wordCache = {};

export async function generateWords(length, opts) {
    let language = opts.language || "english";
    let words = await getWords(language);
    console.log("generating");
    let randomWords = [];
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * words.length);
        randomWords.push(words[randomIndex]);
    }
    return randomWords;
}

async function getWords(language) {
    console.log("getting words");
    if (wordCache[language]) {
        return wordCache[language];
    }
     let response = await fetch("words/" + language + ".json")
    let data = await response.json();
    data.words.sort();
        wordCache[language] = data.words;
        return data.words;
}