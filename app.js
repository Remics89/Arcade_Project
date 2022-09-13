
let game = {
    flatBoard: initialState(),
    initialBuilder: buildBoard(this.flatBoard),
};

function initialState() {
    let board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
    console.log(board);
    return board;
}

function buildBoard(nestedAr) {
    console.log(nestedAr)
    let div = document.createElement('div');
    let table = document.getElementsByTagName('table');
    for (let i = 0; i < nestedAr.length; i++)   {
        let innerArray = nestedAr[i];
        table.appendChild(div);
        for (let a = 0; a < innerArray.length; a++) {
            let element = innerArray[a];
            
        }
    }

}


