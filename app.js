/* **********************************    BUILDING HTML FOR PLAYER INPUT    *************************************** */

// Adding an ID and selected index to the select tag
const selectTag = document.querySelector("select");
selectTag.id = "dropDown";
selectTag.selectedIndex = 0;

// store div with id 'progress' in variable
const inputSection = document.getElementById("progress");

// create new div with id 'player-names'
const div = document.createElement("div");
div.id = "player-names";

// create new div called nameContext
const nameContext = document.createElement("div");

// create 2 input fields and assign IDs, apply them initially as hidden
let nameInput1 = document.createElement("input");
let nameInput2 = document.createElement("input");
nameInput1.id = "inputbox1";
nameInput2.id = "inputbox2";
nameInput1.style = `text-align: center;`;
nameInput2.style = `text-align: center;`;
nameInput1.hidden = true;
nameInput2.hidden = true;

// create a start button
const submitNames = document.createElement("button");
submitNames.id = "submitNames";
submitNames.textContent = "Start Game";
submitNames.hidden = true;

// create a restart game button, apply initially as hidden
const resetBoard = document.createElement("button");
resetBoard.id = "reset";
resetBoard.innerText = "New Game?";
resetBoard.hidden = true;

// append input fields and a text field to id 'player-names'
div.appendChild(nameContext);
div.appendChild(nameInput1);
div.appendChild(nameInput2);

// append start game and reset game buttons to id 'player-names'
div.appendChild(submitNames);
div.appendChild(resetBoard);

// append div w/ id 'player-names' to parent div 'progress'
inputSection.appendChild(div);

/* **********************************    EVENT TRACKERS FOR PLAYER INPUT    *************************************** */

// event listeners for select dropdown
document.getElementById("option1").addEventListener("click", playerNames);
document.getElementById("option2").addEventListener("click", playerNames);
document.getElementById("emptyoption").addEventListener("click", playerNames);

// event listener for start button to load game board
document.getElementById("submitNames").addEventListener("click", buildBoard);

/* **********************************   EVENT TRACKING LOGIC FOR PLAYER INPUT    *************************************** */

// function to render input fields and start game button depending on what select value was chosen
function playerNames() {
    if (document.getElementById("dropDown").selectedIndex === 1) {
        nameContext.innerText = "Please enter your name below";
        nameInput1.hidden = false;
        nameInput2.hidden = false;
        nameInput2.disabled = true;
        nameInput1.placeholder = "Enter Player 1 name";
        nameInput2.value = "Computer";
        submitNames.hidden = false;
    } else if (document.getElementById("dropDown").selectedIndex === 2) {
        nameContext.innerText = "Please enter both player's names below";
        nameInput1.hidden = false;
        nameInput2.hidden = false;
        nameInput2.disabled = false;
        nameInput1.placeholder = "Enter Player 1 name";
        nameInput2.placeholder = "Enter Player 2 name";
        nameInput2.value = "";
        submitNames.hidden = false;
    } else if (document.getElementById("dropDown").selectedIndex === 0) {
        nameContext.innerText = "";
        nameInput1.hidden = true;
        nameInput2.hidden = true;
        nameInput2.disabled = true;
        submitNames.hidden = true;
    }
}

/* **********************************   PLAYING BOARD LOGIC FOR GAMEPLAY   *************************************** */

const board = [null, null, null, null, null, null, null, null, null];
const table = document.querySelector("table");
table.innerText = "";
table.className = "gameBoard";
table.style = `display: none;`;
for (let i = 0; i < board.length; i++) {
    let div = document.createElement("div");
    div.className = "cell";
    div.innerText = "";
    div.style = `width: 120px;
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        cursor: pointer;
        font-size: 35px;`;
    table.appendChild(div);
}

// function to initialize the board and apply styling
function buildBoard() {
    table.style = "";
    hideContent();
}

/* **********************************   ELEMENT PHASE OUT LOGIC FOR GAMEPLAY   *************************************** */

function hideContent() {
    nameInput1.hidden = true;
    nameInput2.hidden = true;
    submitNames.hidden = true;
    nameContext.hidden = true;
    document.querySelector("select").hidden = true;
    document.querySelector("span").innerText = `X: ${nameInput1.value}
    O: ${nameInput2.value}`;
    document.querySelector("span").style = `font-size: xx-large;`;
}

/* **********************************   GAME LOGIC   *************************************** */
let clickedCell = document.querySelectorAll(".cell");

let turn = 0;

for (let i = 0; i < clickedCell.length; i++) {
    clickedCell[i].addEventListener(
        "click",
        function (event) {
            if (turn == 8) {
                let move = "X";
                event.target.innerText = move;
            } else if (turn % 2 === 0) {
                let move = "X";
                turn++;
                event.target.innerText = move;
                if (
                    winningCombination() === "X" ||
                    winningCombination() === "O"
                ) {
                    console.log("we have a winner");
                }
            } else if (turn % 2 === 1) {
                let move = "O";
                turn++;
                event.target.innerText = move;
                if (
                    winningCombination() === "X" ||
                    winningCombination() === "O"
                ) {
                    console.log("we have a winner");
                }
            }
        },
        { once: true }
    );
}

function winningCombination() {
    let array = [];
    let win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < clickedCell.length; i++) {
        let play = clickedCell[i].innerText;
        array.push(play);
    }
    for (i = 0; i < win.length; i++) {
        const [a, b, c] = win[i];
        console.log('asdf');
        if (
            array[a] &&
            array[b] &&
            array[c] &&
            array[a] === array[b] &&
            array[a] === array[c]
        ) {
            console.log('sadf')
            return array[a];
        }
    }
    return null;
}
