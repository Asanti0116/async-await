// Part 1: Number Facts
// 1. 
async function numFact (num, type){
    let baseURL = `http://numbersapi.com/${num}/${type}?json`;
    const res = await axios.get(`${baseURL}`);
    console.log(res.data.text);
}
// 2. 
async function numRangeFact (numStart, numEnd, type){
    let baseURL = `http://numbersapi.com/${numStart}..${numEnd}/${type}?json`;
    const res = await axios.get(`${baseURL}`);
    console.log(res.data);
    let facts = document.createElement(`ul`);
    let numStuff = document.getElementById('num-stuff');
    for (let trivia in res.data){
        let factsLi = document.createElement('li');
        console.log(`${trivia}: ${res.data[trivia]}`);
        factsLi.append(`${trivia}: ${res.data[trivia]}`);
        
    }  
    numStuff.append(facts);
}
// 3. 
async function getFacts(num, qty){
    let baseURL = `http://numbersapi.com/${num}/trivia?json`;
    let facts = document.createElement(`ul`);
    let numStuff = document.getElementById('num-stuff');
    for (let i = 0; i< qty; i++){
        const res = await axios.get(`${baseURL}`);
        let factsLi = document.createElement('li');
        console.log(res.data.text);
        factsLi.append(res.data.text);
        facts.append(factsLi);
    } 
    numStuff.append(facts);  
}
//Part 2: Deck of Cards
class Deck {
    constructor() {
      this.deckId = null;
      this.initialize();
    }
  
    async initialize() {
      const response = await axios.get('https://deckofcardsapi.com/api/deck/new/');
      this.deckId = response.data.deck_id;
      console.log(`Initialized deck with ID ${this.deckId}`);
      await this.shuffle();
    }
  
    async shuffle() {
      console.log(`Shuffling deck with ID ${this.deckId}`);
      const response = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/shuffle/?remaining=true`);
    }
  
    async drawOneCard() {
      console.log(`Drawing one card from deck with ID ${this.deckId}`);
      const response = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`);
      console.log(response.data.remaining);
      console.log(response.data.cards[0].image);
      console.log(`Drew card: ${response.data.cards[0].value} of ${response.data.cards[0].suit}`);
        if (response.data.remaining > 0){
            return response.data.cards[0].image;
        } else{
            let button = document.getElementById('draw-card')
            button.innerHTML="restart game";
            return alert("no more cards")
        }
    }
@@ -85,7 +87,6 @@ async function playGame() {
            img.src= await deck.drawOneCard();
            cardStack.append(img);}
            catch{
                button.innerHTML="restart game";
                location.reload();
            }
          });
    }
}
playGame();
