export async function numberSpinner(element) {
    let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let duration = 2000;
   let text = element.innerText;
   element.innerText = "";
   let letters = text.split("");
   console.log("letters", letters);
   let letterDivs = letters.map((e) => {
         let div = document.createElement("div");
         div.innerText = e;
         div.style.display = "flex";
       div.style.flexDirection = "row";
         return div;
   });
   element.style.display = "flex";
   element.style.flexDirection = "row";
   element.append(...letterDivs);
   let iterations = duration / 40;
   for (let t = iterations; t >= 0; t--) {
         for (let i = 0; i < letterDivs.length; i++) {
              let div = letterDivs[i];
              let randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
              if (t <= iterations / i) {
                 div.innerText = letters[i];
              } else {
                  div.innerText = randomLetter;
              }
         }
         await new Promise(r => setTimeout(r, 20));
   }
}