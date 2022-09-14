const gameStart = {
    playerName: playerNames(),
    gameBoard: buildBoard(),
};

function playerNames() {
    let div = document.createElement("div");
    div.id = "player-names";

    let nameInput1 = document.createElement("input");
    let nameInput2 = document.createElement("input");
    nameInput1.id = "inputbox1";
    nameInput2.id = "inputbox2";

    let inputSection = document.getElementById("progress");
    let submitNames = document.createElement("button");
    submitNames.textContent = "Start Game";

    nameInput2.disabled = true;
    nameInput2.placeholder = "Computer";

    submitNames.id = "submitNames";

    div.appendChild(nameInput1);
    div.appendChild(nameInput2);

    div.appendChild(submitNames);
    inputSection.appendChild(div);
}

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
    table.className = "gameBoard";
    table.id = "fader";
    for (let i = 0; i < board.length; i++) {
        let div = document.createElement("div");
        div.className = "cell";
        div.style = `width: 120px;
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        cursor: pointer;
        font-size: xx-large;
        border: 2px solid black;`;
        table.appendChild(div);
    }
}
