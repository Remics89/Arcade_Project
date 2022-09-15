function playerNames() {
    if (document.getElementById("dropDown").selectedIndex === 1) {
        nameContext.innerText = "Please enter your name below";
        nameInput1.hidden = false;
        nameInput2.hidden = false;
        nameInput2.disabled = true;
        nameInput2.placeholder = "Computer";
        submitNames.hidden = false;
    } else if (document.getElementById("dropDown").selectedIndex === 2) {
        nameContext.innerText = "Please enter both player names below";
        nameInput1.hidden = false;
        nameInput2.hidden = false;
        nameInput2.disabled = false;
        nameInput2.placeholder = "";
        submitNames.hidden = false;
    } else if (document.getElementById("dropDown").selectedIndex === 0) {
        nameContext.innerText = '';
        nameInput1.hidden = true;
        nameInput2.hidden = true;
        nameInput2.disabled = true;
        submitNames.hidden = true;
    }
}

let selectTag = document.querySelector("select");
selectTag.id = "dropDown";
selectTag.selectedIndex = 0;

let inputSection = document.getElementById("progress");

let div = document.createElement("div");
div.id = "player-names";

let nameContext = document.createElement("div");

let nameInput1 = document.createElement("input");
let nameInput2 = document.createElement("input");
nameInput1.id = "inputbox1";
nameInput2.id = "inputbox2";
nameInput1.hidden = true;
nameInput2.hidden = true;

let submitNames = document.createElement("button");
submitNames.id = "submitNames";
submitNames.textContent = "Start Game";
submitNames.hidden = true;

let resetBoard = document.createElement('button');
resetBoard.id = 'reset';
resetBoard.innerText = 'New Game?'
resetBoard.hidden = true;

div.appendChild(nameContext);
div.appendChild(nameInput1);
div.appendChild(nameInput2);

div.appendChild(submitNames);
div.appendChild(resetBoard);

inputSection.appendChild(div);

document.getElementById("input1").addEventListener("click", playerNames);
document.getElementById("input2").addEventListener("click", playerNames);
document.getElementById("blankInput").addEventListener("click", playerNames);

document.getElementById("submitNames").addEventListener("click", buildBoard);

document.getElementById("input1").addEventListener("click", () => {
    document.getElementById("inputbox2").disabled = true;
    document.getElementById("inputbox2").placeholder = "Computer";
});

document.getElementById("input2").addEventListener("click", () => {
    document.getElementById("inputbox2").disabled = false;
    document.getElementById("inputbox2").value = "";
    document.getElementById("inputbox2").placeholder = "";
});

function buildBoard() {
    let board = [null, null, null, null, null, null, null, null, null];
    let table = document.querySelector("table");
    table.innerText = "";
    table.className = "gameBoard";
    table.id = "fader";
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
}

