let wordCache = {};
let quoteCache = {};

export async function generateWords(length, opts) {
    let language = opts.language || "english";
    if (opts.mode == "words") {
        let words = await getWords(language);
        let randomWords = [];
        for (let i = 0; i < length; i++) {
            let randomIndex = Math.floor(Math.random() * words.length);
            randomWords.push(words[randomIndex]);
        }
        return {words: randomWords};
    } else {
        let quotes = await getQuotes(language);
        let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        return {words: randomQuote.text.split(" "), author: randomQuote.source};
    }
}

async function getQuotes(language) {
    if (quoteCache[language]) {
        return quoteCache[language];
    }
    let response = await fetch("quotes/" + language + ".json");
    let data = await response.json();
    quoteCache[language] = data.quotes;
    return data.quotes;
}

async function getWords(language) {
    if (wordCache[language]) {
        return wordCache[language];
    }
     let response = await fetch("words/" + language + ".json")
    let data = await response.json();
    data.words.sort();
        wordCache[language] = data.words;
        return data.words;
}