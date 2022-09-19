/* **********************************    BUILDING HTML FOR PLAYER INPUT    *************************************** */
// HTML References
const gameBoardElement = document.querySelector("table.gameBoard");
const selectTag = document.querySelector("select");

/* **********************************    STATE    *************************************** */

// State Object (data that represents state of game)
// - anything that defines how the game presents or behaves
const state = {};

/* **********************************    INITIAL STATE    *************************************** */

function buildInitialState() {
    const selectTag = document.querySelector("select");
    selectTag.hidden = false;
    selectTag.selectedIndex = 0;

    const dropDialog = document.querySelector("#dropdownDialog");
    dropDialog.hidden = false;

    state.players = ["X", "O"];
    state.board = [null, null, null, null, null, null, null, null, null];
    state.option = 0;
    state.gameBoard = false;
    state.player1 = "";
    state.player2 = "";
    state.input1 = false;
    state.input2 = false;
    state.inputsEnabled = false;
    state.resetButton = false;
    state.select = true;
    state.turn = 0;
}

/* **********************************    CLEARING FUNCTIONS    *************************************** */

function clearField(element) {
    if (element === null) {
        return;
    } else if (state.gameBoard === true) {
        let p1input = document.getElementById("inputbox1");
        let p2input = document.getElementById("inputbox2");
        let submit = document.getElementById("submitNames");
        let removeDiv = document.getElementById("progress");
        removeDiv.children[0].hidden = true;
        p1input.hidden = true;
        p2input.hidden = true;
        submit.hidden = true;
    } else {
        element.hidden = true;
    }
}

function clearOption(optionPanel) {
    optionPanel.hidden = true;
}

/* **********************************    RENDERER    *************************************** */

// Render (state -> html)
// - ONLY READ (NOT modify) state object
// - ONLY WRITE (modify) html
function render() {
    // clear page
    gameBoardElement.innerHTML = "";

    // create elements

    /* ****************    IS GAMEBOARD ACTIVE?    *************** */

    if (state.gameBoard === false) {
        if (state.option === 1) {
            if (state.inputsEnabled === true) {
                state.inputsEnabled = false;
                clearField(document.getElementById("player-names"));
            }
            loadInputs(1);
        } else if (state.option === 2) {
            if (state.inputsEnabled === true) {
                state.inputsEnabled = false;
                clearField(document.getElementById("player-names"));
            }
            loadInputs(2);
        } else if (state.option === 0) {
            if (state.inputsEnabled === true) {
                state.inputsEnabled = false;
            }
            return;
        }
    } else if (state.gameBoard === true) {
        clearField(document.getElementById("player-names"));
    }
    if (state.select === false) {
        const options = document.querySelector("#dropdown");
        clearOption(options);
    }

    if (state.resetButton === true) {
        const reset = document.getElementById("reset");
        reset.hidden = false;
    }

    /* **************    BUILD GAME BOARD AND CLICK EVENT   ***************** */
    if (state.gameBoard === true) {
        for (let i = 0; i < state.board.length; i++) {
            let cellElement = document.createElement("div");
            cellElement.className = "cell";
            cellElement.hidden = false;
            cellElement.innerText = state.board[i];
            gameBoardElement.appendChild(cellElement);
        }
        dialog();
    }
}

/* **********************************    RENDER HELPER FUNCTIONS    *************************************** */

function dialog() {
    const dialogBox = document.querySelector("#dialogBox");
    dialogBox.innerText = `X: ${state.player1} O: ${state.player2}`;
}

function dialogStart() {
    const dialogBox = document.querySelector("#dialogBox");
    dialogBox.hidden = true;
}

function loadInputs(num) {
    // create new div for input fields
    const div = document.createElement("div");

    // give the new div an ID of player-names
    div.id = "player-names";

    // create new field for dialog that player can follow
    const nameContext = document.createElement("div");

    // create input field tags
    const nameInput1 = document.createElement("input");
    const nameInput2 = document.createElement("input");

    // give input fields some IDs
    nameInput1.id = "inputbox1";
    nameInput2.id = "inputbox2";

    // style inputs to center font
    nameInput1.style = `text-align: center;`;
    nameInput2.style = `text-align: center;`;

    // num check whether 1 or 2 players
    if (num === 1) {
        // give nameContext some text
        nameContext.innerText = "Please enter your name below";
        nameContext.id = "dialogBox";

        // since only 1 player, disable input field 2
        nameInput2.disabled = true;
        nameInput1.placeholder = "Enter Player 1 name";
        nameInput2.value = "Computer";
    } else if (num === 2) {
        // since 2 players are playing, address both players and ask to fill names
        nameContext.innerText = "Please enter both player's names below";
        nameContext.id = "dialogBox";
        nameInput2.disabled = false;

        // create input field placeholders

        nameInput1.placeholder = "Enter Player 1 name";
        nameInput2.placeholder = "Enter Player 2 name";
    }

    //grab div element w/ ID 'progress'
    const inputSection = document.getElementById("progress");

    // check whether input fields have been added to HTML
    if (state.inputsEnabled === false) {
        div.appendChild(nameContext);
        div.appendChild(nameInput1);
        div.appendChild(nameInput2);

        // submit button
        const submitNames = document.createElement("button");
        submitNames.id = "submitNames";
        submitNames.textContent = "Start Game";

        // reset button
        const resetBoard = document.createElement("button");
        resetBoard.id = "reset";
        resetBoard.innerText = "New Game?";
        resetBoard.hidden = true;

        // append submit and reset buttons to div
        div.appendChild(submitNames);
        div.appendChild(resetBoard);

        // append div to parent div
        inputSection.appendChild(div);

        // re-mark input fields as having been enabled
        state.inputsEnabled = true;
    }

    /* ********************* SUBMIT BUTTON TRACKER ********************** */

    document
        .getElementById("submitNames")
        .addEventListener("click", function () {
            state.player1 = document.getElementById("inputbox1").value;
            state.player2 = document.getElementById("inputbox2").value;
            state.input1 = false;
            state.input2 = false;
            state.start = true;
            state.gameBoard = true;
            state.select = false;

            render();
        });

    /* **************************************************************** */

    // event tracker for reset button
    document.getElementById("reset").addEventListener("click", reset);
}

/* **********************************    GAME LOGIC    *************************************** */

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
    for (let i = 0; i < gameBoardElement.children.length; i++) {
        let play = gameBoardElement.children[i].innerText;
        array.push(play);
    }
    for (i = 0; i < win.length; i++) {
        const [a, b, c] = win[i];
        if (
            array[a] &&
            array[b] &&
            array[c] &&
            array[a] === array[b] &&
            array[a] === array[c]
        ) {
            return array[a];
        }
    }
    return null;
}

// function computerPlay() {
//     while (state.gameBoard === true && state.turn % 2 === 1) {
//         let click;
//         function clickFunc(){
//             click = gameBoardElement.click();
//         }
        
//         setInterval(clickFunc, 5000)
//     }
// }

/* **********************************    EVENT LISTENING    *************************************** */

// User Actions (user input -> state)
// - ONLY READ html
// - ONLY WRITE (modify) state
// - after modification: trigger render()

// event tracker for 1player select
document.getElementById("option1").addEventListener("click", function (event) {
    state.option = 1;
    state.input1 = true;
    state.input2 = true;

    render();
});

// event tracker for 2 player select
document.getElementById("option2").addEventListener("click", function (event) {
    state.option = 2;
    state.input1 = true;
    state.input2 = true;

    render();
});

// event tracker for empty select
document
    .getElementById("emptyoption")
    .addEventListener("click", function (event) {
        state.option = 0;
        state.input1 = false;
        state.input2 = false;

        clearField(document.getElementById("player-names"));

        render();
    });

gameBoardElement.addEventListener("click", function (event) {
    gameCheck(event);
    // computerPlay();
});

/* ************************************    EVENT FUNCTIONS    ***************************************** */

function gameCheck(event) {
    const dialogBox = document.querySelector("#dialogBox");
    if (winningCombination() !== null) {
        dialogBox.innerText = `Player ${winningCombination()} is the winner!`;
        state.resetButton = true;
        enableReset();
        return;
    }
    if (state.turn == 8) {
        let move = state.players[0];
        event.target.innerText = move;
        dialogBox.innerText = "Draw! No one scored 3 in a row.";
        state.resetButton = true;
        enableReset();
        // render();
    } else if (state.turn % 2 === 0) {
        if (winningCombination() !== null) {
            let move = "X";
            event.target.innerText = move;
            dialogBox.innerText = `Player ${winningCombination()} is the winner!`;
            state.resetButton = true;
            enableReset();
            // render();
        } else if (winningCombination() === null) {
            let move = "X";
            state.turn = state.turn + 1;
            event.target.innerText = move;

            if (winningCombination() !== null) {
                dialogBox.innerText = `Player ${winningCombination()} is the winner!`;
                state.resetButton = true;
                enableReset();
                // render();
            }
        }
    } else if (state.turn % 2 === 1) {
        if (winningCombination() !== null) {
            let move = "O";
            event.target.innerText = move;
            dialogBox.innerText = `Player ${winningCombination()} is the winner!`;
            state.resetButton = true;
            enableReset();
            // render();
        } else if (winningCombination() === null) {
            // if (state.player2 === "Computer") {
            //     console.log("computer has made a move");
            // }
            let move = "O";
            state.turn = state.turn + 1;
            event.target.innerText = move;
            if (winningCombination() !== null) {
                dialogBox.innerText = `Player ${winningCombination()} is the winner!`;
                state.resetButton = true;
                enableReset();
                // render();
            }
        }
    }
}
function reset() {
    const inputs = document.getElementById("player-names");
    inputs.hidden = false;

    const resetB = document.getElementById("reset");
    resetB.hidden = true;
    dialogStart();
    buildInitialState();
    render();
}

function enableReset() {
    const reset = document.getElementById("reset");
    reset.hidden = false;
}

// listen for clicks on a cell, update game state to add to cell

/* ************************************    FUNCTION RECALL    ***************************************** */

// call render
// Initialize
buildInitialState();
render();
