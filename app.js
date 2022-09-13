let gameStart = {
    playerCount: modeSelection(),
    playerName: players(),
    gameBoard: buildBoard(),
};

function modeSelection() {
    let div = document.createElement("div");
    let playerInput = document.createElement("input");
    let body = document.querySelector("body");
    div.style = `
        opacity: 1;
        transition-duration: 20s;
        transition-property: opacity;
        `;
}

function players() {}

function buildBoard() {
    let board = [null, null, null, null, null, null, null, null, null];
    let table = document.createElement("table");
    document.body.appendChild(table)[-1];
    table.className = "gameBoard";
    table.id = 'fader';
    for (let i = 0; i < board.length; i++) {
        let div = document.createElement("div");
        div.className = "cell";
        table.appendChild(div);
        div.innerText = "X";
    }

    table.style = `opacity: 1;
    transition-duration: 10s;
    transition-property: opacity;`

}
