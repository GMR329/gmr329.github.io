/**
 * Gameplay.js
 * 
 * Controls pirate themed drinking game that is 
 * played and interacted with via the browser. 
 * 
 * @author: Gareth Rice
 * @version: 10/16/2024
 * 
 * ToDo: 
 *      - Add pirates code/tavern page
 *          -Make popup for pirates code
 *          -Make popup for gold addition
 *      - Pretty everything up!
 *      - Indicate whose turn it is
 *          -Add field in card section. Use get pirate method to set pirate
 *          there in the unhide field sections and change dig/plunder screen too
 *      - Allow the changing of gold for each pirate
 *      - Add win condition! Including win screen that creates new game instance
 *          and brings players back to very first screen 
 *      - Add automated tests so I don't have to click every damn button
 *      - Add potential random or skip button for pirate code. Random button is "inspire" button
 *          -Have codes that must be done after dig phase or right before phase or something
 *          to try and trip up players
 * 
 * Known Bugs: 
 * 
 */


/**
 * Card class 
 * 
 * holds information for instruction cards
 */
class Card{
    constructor(title, txt){
        this.title = title; 
        this.body = txt; 
    }

    getTitle(){
        return this.title; 
    }

    getBody(){
        return this.body; 
    }
}


/**
 * Pirate class 
 * 
 * allows the instantiation of a player
 */
class Pirate{
    constructor(name){
        this.name = name; 
        this.gold = 0; 
    }

    getName(){
        return this.name; 
    }

    getGold(){
        return this.gold; 
    }

    addGold(g){
        this.gold += g; 
    }

    toString(){
        return this.name + " has " + this.gold.toString() + " gold."; 
    }
}


/**
 * GameState class 
 * 
 * tracks the players and holds game elements 
 * like event decks, and pirates code
 */
class GameState{
    pirates = []; 

    // 2D Array representing our card decks
    // I got sick and tired of trying to read
    // my CSV! Eventually, make this a database
    // or at the very least a damn file!
    // And use the Card class. 
    digDeckData = [
        ["Oracle Stone!", "You dig up a glowing blue stone and gain a special power. When you ask a question, whoever answers it with a statement must drink. You are the master of questions. The pirate question master."],
        ["I Thought YOU Brough the Spade", "You forgot the shovel. Drink 3 times while you wait for the crew."],
        ["Rum Cask", "Not exactly conventional treasure, but hey! Rum! Take 2 shots"],
        ["Big Booty", "Get your mind outta the gutter! You found treasure! Gain 5 gold and drink 1 time."],
        ["Tiny Booty", "You found a little treasure! Gain 3 gold and drink 2 times."],
        ["Golden Idol", "The golden idol looks exactly like you... wierd. Gain 3 gold and drink 3 times to settle your unease."],
        ["Coconut", "Turns out, X doesn't mark the spot. But hey! Coconuts. Drink 3 times."],
        ["Programmer Fatigue", "Just... drink 4 times. I have so many more of these to write. Drink 1 more time because it's 1 am and I'm power tripping!"],
        ["Message in a Bottle", "\"We've been trying to reach you regarding your ships extended warranty.\" Drink 2 times."],
        ["VooDoo Dolls", "What a treasure indeed! Divide 4 drinks among the crew however you wish."]
    ];
    digDeckMaxIdx = this.digDeckData.length; 

    plunderDeckData = [
        ["Pirates In Arms", "You plundered bravely with a pirate of your choice. They become your first mate. When you drink, so do they. Also, drink!"],
        ["A Mere Pittance", "You broke into the richest house in the city. And found very little. Gain 1 gold and drink 2 times to drown the disappointment."],
        ["You Can't Rob Children!", "You shook down someone much younger than you thought. Gain no gold. Drink 1 time."],
        ["Not the Castle!", "You're drunk. You're not robbing the castle. Drink 2 times and forget about it."],
        ["Fuck It! Rob the Castle!", "There were remarkably few guards. You found the wine stores and the treasury. Gain 4 gold and drink 1 time."],
        ["Rob the Bar!", "Money and booze. What could go wrong? Drink 3 times. Gain 3 gold."],
        ["...Because We're Pirates", "Take 2 gold from a player of your choice. Then drink 1 time in shame, you monster."],
        ["Blackout!", "You drank too much, passed out, and your pocket was picked. Lose 2 gold (if you have it)"],
        ["Wet Gunpowder", "Your gun couldn't fire and you only pushed the bluff so far. Gain 1 gold and drink 1 time in relief it worked at all."],
        ["Remarkable Bullshit!", "As drunk as you are, you looked terrifying and robbed the town square. Gain 3 gold and drink 1 time."],
        ["He Has a Shotgun?", "Pick a partner to shotgun any drink with you. If no one agrees, or you don't want to, drink twice. Otherwise, you gain 3 gold and your partner gains 2."]
    ];
    plunderDeckMaxIdx = this.plunderDeckData.length; 

    seaDeckData = [
        ["Sail North", "Point towards North. Last player must drink."],
        ["Hard to Port", "Raise your left hand. Last player must drink."],
        ["Hard to Starboard", "Raise your right hand. Last player must drink."],
        ["She's a Pirate!", "Lady Captains, drink!"],
        ["He's a Pirate!", "Sir Captains, drink!"],
        ["Liars Walk the Plank", "Captain, give two truths and a lie. All others guess. Losers drink!"],
        ["Good Pirates Never...", "Play Never Have I Ever. Loser, drink!"],
        ["Clear Skies", "Enjoy the stars, and sober up!"],
        ["Clear Seas", "Enjoy the water, and sober up!"],
        ["All Hands!", "Clean something up, and sober up!"],
        ["Loyal to the Captain", "With the current captain in the lead, waterfall your drink in pirate order."],
        ["Tyranny", "We just had a mutiny against tyranny! Vote on who's the most tyrannical. They drink twice and lighten up!"],
        ["Skirt the Scurvy", "Make a drink with citrus and take a drink. If you can't, drink 3 times"],
        ["Pay Attention You Scoundrel!", "Play a game of concentration. Loser drinks 2 times"],
        ["KRAKEN!", "No one wants to be sober for this. Captain, take a shot. Everyone else, drink 3 times"],
        ["Real Pirates!", "Collectively give up 2 total gold per player, or everyone give one gold and drink 2 times. Giving gold must be agreed upon unanimously, and any amount of the total gold can be taken from any one player."],
        ["Hoist the Colors!", "Everyone drink to the freedom of being a pirate!"]
    ];
    seaDeckMaxIdx = this.seaDeckData.length; 


    constructor(){
        //get drawn card areas to update later
        this.cardTitle = document.getElementById("drawCardTitle"); 
        this.cardDesc = document.getElementById("drawCardDesc"); 

        //can shuffle deck every time (current) or choose randomly based on prob
        this.shuffleDeck(this.seaDeckData); 
        this.seaDeckIdx = 0;
        this.shuffleDeck(this.digDeckData); 
        this.digDeckIdx = 0; 
        this.shuffleDeck(this.plunderDeckData); 
        this.plunderDeckIdx = 0; 

        this.pirateCode = []; 
        this.pirateCodeIdx = 1; 
        this.pirateCodeSize = 5; //Number - 1. Can change later? 
        for(let i = 0; i < this.pirateCodeSize + 1; i++){
            this.pirateCode.push("A Pirate Always May Parlay"); 
        }

        this.numPirates = 0; 
        this.pirateCapIdx = 0; 

        this.testMethod(); 
    }

    hasWinner(){
        //Eventually, have player able to set winning gold number
        //Eventually, have loser forced to drink the pirates ire
        let returnPirate = [false, "hello"]; 
        for(let i = 0; i < this.pirates.length; i++){
            if(this.pirates[i].getGold() >= 15){
                console.log("Pirate Captain wins!"); 
                returnPirate[0] = true; 
                returnPirate[1] = this.pirates[i].getName(); 
            }
        }
        return returnPirate; 
    }

    finalSetup(numP){
        //maybe wrap this in try catch? 
        this.captain = this.pirates[this.pirateCapIdx]; 
        this.numPirates = numP; 
    }

    nextTurn(){
        this.pirateCapIdx = (this.pirateCapIdx + 1) % this.numPirates; 
        this.captain = this.pirates[this.pirateCapIdx]; 
        this.pirateCodeIdx = (this.pirateCodeIdx % this.pirateCodeSize) + 1; 
    }

    getCaptain(){
        return this.captain; 
    }

    getCurrentCode(){
        return this.pirateCode[this.pirateCodeIdx].substring(16); 
    }

    getCurrentCodeIdx(){
        return this.pirateCodeIdx; 
    }

    setCurrentCode(codeIn){
        this.pirateCode[this.pirateCodeIdx] = "A Pirate Always " + codeIn; 
    }

    addPirate(name){
        this.pirates.push(new Pirate(name)); 
    }

    printPirates(){
        for(let i = 0; i < this.pirates.length; i++){
            console.log(this.pirates[i].toString()); 
        }
    }

    shuffleDeck(deckArr){
        let currIdx = deckArr.length; 

        while(currIdx != 0){
            let randIdx = Math.floor(Math.random() * currIdx); 
            currIdx--; 

            [deckArr[currIdx], deckArr[randIdx]] = [deckArr[randIdx], deckArr[currIdx]]; 
        }
    }

    drawSeaDeck(){
        console.log("Idx: " + this.seaDeckIdx.toString() + " Max: " + this.seaDeckMaxIdx.toString()); 
        if(this.seaDeckIdx >= this.seaDeckMaxIdx){
            this.shuffleDeck(this.seaDeckData); 
            this.seaDeckIdx = 0; 
        }
        this.cardTitle.textContent = this.seaDeckData[this.seaDeckIdx][0]; 
        this.cardDesc.textContent = this.seaDeckData[this.seaDeckIdx][1]; 
        this.seaDeckIdx++;    
    }

    drawDigDeck(){
        if(this.digDeckIdx >= this.digDeckMaxIdx){
            this.shuffleDeck(this.digDeckData); 
            this.digDeckIdx = 0; 
        }
        this.cardTitle.textContent = this.digDeckData[this.digDeckIdx][0]; 
        this.cardDesc.textContent = this.digDeckData[this.digDeckIdx][1]; 
        this.digDeckIdx++; 
    }

    drawPlunderDeck(){
        if(this.plunderDeckIdx >= this.plunderDeckMaxIdx){
            this.shuffleDeck(this.plunderDeckData); 
            this.plunderDeckIdx = 0; 
        }
        this.cardTitle.textContent = this.plunderDeckData[this.plunderDeckIdx][0]; 
        this.cardDesc.textContent = this.plunderDeckData[this.plunderDeckIdx][1]; 
        this.plunderDeckIdx++; 
    }

    testMethod(){
        console.log("Game Set Up And Rocking"); 
    }

}



// ---------------------------- PAGE HIDING HELPER FUNCTIONS ----------------------------



/**
 * initial setup
 */
function hideElements(){
    for(let i = 2; i < MAX_PLAYERS + 1; i++){
        document.getElementById("pInput".concat(i.toString())).style.visibility = 'hidden'; 
    }

    hideDrawScreen(); 
    hideDrawnCard(); 
    hideCodeScreen(); 
    hideHeaderPlay(); 
    hideWinScreen(); 

    document.getElementById("setupFullDiv").style.zIndex = 9; 
}

/**
 * hide the various screens when we move on to next
 */
function hideSetupScreen(){
    document.getElementById("setupFullDiv").style.visibility = 'hidden'; 

    for(let i = 1; i < MAX_PLAYERS + 1; i++){
         document.getElementById("pInput".concat(i.toString())).style.visibility = 'hidden';
    }

    document.getElementById("setupFullDiv").style.zIndex = 1; 
}

/**
 * unhide the gold and pirate code info header
 */
function unhideHeaderPlay(){
    for(let i = 0; i < playerCount; i++){
        let name = theGame.pirates[i].getName(); 
        let gold = theGame.pirates[i].getGold(); 

        document.getElementById("idNameBanner".concat(i.toString())).textContent = name;
        document.getElementById("idGoldBanner".concat(i.toString())).textContent = gold + " G";
    }
    for(let i = playerCount; i < MAX_PLAYERS; i++){
        document.getElementById("idNameBanner".concat(i.toString())).style.visibility = 'hidden';
        document.getElementById("idGoldBanner".concat(i.toString())).style.visibility = 'hidden';
    }

    document.getElementById("headerPlayScreen").style.visibility = 'visible'; 
    document.getElementById("headerPlayScreen").style.zIndex = 2; 
}

/**
 * hide gold stuff
 */
function hideHeaderPlay(){
    document.getElementById("headerPlayScreen").style.visibility = 'hidden'; 
    document.getElementById("headerPlayScreen").style.zIndex = 9; 
}

/**
 * unhide welcome message at game beginning
 */
function unhideHeaderStart(){
    document.getElementById("headerStartScreen").style.visibility = 'visible'; 
    document.getElementById("headerStartScreen").style.zIndex = 4; 
}

/**
 * hide beginning welcome message
 */
function hideHeaderStart(){
    document.getElementById("headerStartScreen").style.visibility = 'hidden'; 
    document.getElementById("headerStartScreen").style.zIndex = 9; 
}

/**
 * unhide the pirate code page
 */
function unhideCodeScreen(){
    document.getElementById("pirateCodeDiv").style.visibility = 'visible'; 
    document.getElementById("pirateCodeDiv").style.zIndex = 3; 
    //set captains name and actual pirate code to input box
    let cap = theGame.getCaptain().getName(); 
    document.getElementById("pCodePrompt").textContent = "Captain " + cap + " Says: A Pirate Always..."; 
    document.getElementById("inputPirateCode").value = theGame.getCurrentCode(); 
}

/**
 * hide the pirate code page
 */
function hideCodeScreen(){
    document.getElementById("pirateCodeDiv").style.visibility = 'hidden'; 
    document.getElementById("pirateCodeDiv").style.zIndex = 9; 
}

/**
 * unhide the deck drawing screen and update display order
 */
function unhideDrawScreen(){
    document.getElementById("drawFullDiv").style.visibility = 'visible'; 
    document.getElementById("drawFullDiv").style.zIndex = 9; 
}

/**
 * hide the deck drawing screen
 */
function hideDrawScreen(){
    document.getElementById("drawFullDiv").style.visibility = 'hidden'; 
    document.getElementById("drawFullDiv").style.zIndex = 2; 
}


/**
 * unhid card drawn. Use this for all cards/events
 */
function unhideDrawnCard(){
    document.getElementById("cardFullDiv").style.visibility = 'visible'; 
    document.getElementById("cardFullDiv").style.zIndex = 9; 
    document.getElementById("setSailBtn").textContent = 'SET SAIL'; 
}


/**
 * hide card drawn format
 */
function hideDrawnCard(){
    document.getElementById("cardFullDiv").style.visibility = 'hidden'; 
    document.getElementById("cardFullDiv").style.zIndex = 3; 
}


/**
 * unhide win screen
 */
function unhideWinScreen(){
    document.getElementById("idWinScreen").style.visibility = 'visible'; 
    document.getElementById("idWinScreen").style.zIndex = 9;  
}


/**
 * hide win screen
 */
function hideWinScreen(){
    document.getElementById("idWinScreen").style.visibility = 'hidden'; 
    document.getElementById("idWinScreen").style.zIndex = 5;  
}


// ---------------------------- BUTTONS AND CLICK EVENTS ----------------------------



/**
 * addBtn: 
 * Adds spots for players to add in names to add to game
 */
const addBtn = document.getElementById("addBtn"); 
addBtn.onclick = function(){
    playerCount += 1; 

    if(playerCount > MAX_PLAYERS){
        console.log("Max player count exceeded"); 
        playerCount = MAX_PLAYERS; 
    }else{
        document.getElementById("pInput".concat(playerCount.toString())).style.visibility = 'visible'; 
    }
}


/**
 * dropBtn:
 * Drops spots for players to add
 */
const dropBtn = document.getElementById("dropBtn"); 
dropBtn.onclick=function(){
    if(playerCount <= 1){
        console.log("Too few players"); 
        playerCount = 1; 
    }else{
        document.getElementById("pInput".concat(playerCount.toString())).style.visibility = 'hidden'; 
        playerCount -= 1; 
    }
}


/**
 * beginBtn: 
 * Begin the game. Set up number of players and read in cards
 */
const beginBtn = document.getElementById("beginBtn"); 
beginBtn.onclick = function(){
    for(let i = 1; i < playerCount + 1; i++){
        let pName = document.getElementById("pInput".concat(i.toString())).value; 
        theGame.addPirate(pName); 
    }

    theGame.printPirates(); 
    theGame.finalSetup(playerCount); 

    hideSetupScreen(); 
    hideHeaderStart(); 
    hideWinScreen(); 
    unhideCodeScreen(); 
    unhideHeaderPlay(); 
}


/**
 * updateCodeBtn: 
 * updates the code
 */
const updateCodeBtn = document.getElementById("updateCodeBtn");
updateCodeBtn.onclick = function(){
    let text = document.getElementById("inputPirateCode").value; 
    theGame.setCurrentCode(text); 
    let codeIdx = theGame.getCurrentCodeIdx(); 
    document.getElementById("pCodeDis".concat(codeIdx.toString())).textContent = "A Pirate Always " + text; 
}


/**
 * codeSailBtn: 
 * Initial page that shows pirate code has a continue button
 */
const codeSailBtn = document.getElementById("codeSailBtn"); 
codeSailBtn.onclick = function(){
    document.getElementById("turnIndicator").textContent = "Captain " + theGame.getCaptain().getName() + " sets sail!";
    hideCodeScreen(); 
    unhideDrawScreen(); 
}


/**
 * digBtn:
 * Pulls a card that digs for treasure. Should use the existing game object
 * set backgrounds for digging
 */
const digBtn = document.getElementById("digBtn"); 
digBtn.onclick = function(){
    hideDrawScreen(); 
    unhideDrawnCard(); 
    theGame.drawDigDeck(); 
}


/**
 * plunderBtn:
 * Pulls a card that plunders. Should use the existing game object
 * set backgrounds for plunder
 */
const plunderBtn = document.getElementById("plunderBtn"); 
plunderBtn.onclick = function(){
    hideDrawScreen(); 
    unhideDrawnCard(); 
    theGame.drawPlunderDeck(); 
}


/**
 * setSailBtn:
 * Eventually should draw a sail card. For now, return to dig/plunder
 * set backgrounds for sea or port
 */
const setSailBtn = document.getElementById("setSailBtn"); 
setSailBtn.onclick = function(){
    setSailBtn.textContent = 'RETURN TO PORT'; 

    if(sailScreen == 0){
        theGame.drawSeaDeck(); 
        sailScreen = 1; 
    }else{
        //show port screen. For now, bring back to dig/plunder
        hideDrawnCard(); 
        let winCon = theGame.hasWinner(); 
        if(winCon[0] == true){
            //display the win screen 
            unhideWinScreen(); 
            console.log(winCon[1]); 
            document.getElementById("idWinBanner").textContent = "Captain " + winCon[1] + " Wins!";
            return; 
        }
        theGame.nextTurn(); 
        unhideCodeScreen(); 
        sailScreen = 0; 
    }

}

let addFlag = true; 
const goldAddBtn = document.getElementById("idBannerBtn"); 
goldAddBtn.onclick = function(){
    addFlag = !addFlag; 
    for(let i = 0; i < playerCount; i++){
        let goldColor = document.getElementById("idGoldBanner".concat(i.toString())); 
        if(addFlag){
            goldColor.style.color = '#daaf37'; 
        }else{
            goldColor.style.color = '#0000ff'; 
        }
    }
}

function updateGold(playerNum){
    if(addFlag){
        theGame.pirates[playerNum].addGold(1); 
    }else{
        theGame.pirates[playerNum].addGold(-1); 
    }
    unhideHeaderPlay(); 
}

const addGold0 = document.getElementById("idGoldBanner0"); 
addGold0.onclick = function(){
    updateGold(0); 
}
const addGold1 = document.getElementById("idGoldBanner1"); 
addGold1.onclick = function(){
    updateGold(1); 
}
const addGold2 = document.getElementById("idGoldBanner2"); 
addGold2.onclick = function(){
    updateGold(2); 
}
const addGold3 = document.getElementById("idGoldBanner3"); 
addGold3.onclick = function(){
    updateGold(3); 
}
const addGold4 = document.getElementById("idGoldBanner4"); 
addGold4.onclick = function(){
    updateGold(4); 
}
const addGold5 = document.getElementById("idGoldBanner5"); 
addGold5.onclick = function(){
    updateGold(5); 
}
const addGold6 = document.getElementById("idGoldBanner6"); 
addGold6.onclick = function(){
    updateGold(6); 
}



// ---------------------------- RUN THE GAME ----------------------------



console.log("Hello, World!"); 
let sailScreen = 0; 
theGame = new GameState(); 

const MAX_PLAYERS = 7; 
let playerCount = 1; 

hideElements(); 

