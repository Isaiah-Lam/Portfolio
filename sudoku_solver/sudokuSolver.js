var x = 0;
var y = 0;
var n = 1;
var c = 0;
var numSolved = 0;
var bClass = [0,0,0,1,1,1,2,2,2,0,0,0,1,1,1,2,2,2,0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,3,3,3,4,4,4,5,5,5,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,6,6,6,7,7,7,8,8,8,6,6,6,7,7,7,8,8,8];
var board = [];
while(c < 81) {
    let div = document.createElement("div");
    let grid = document.getElementById("board");
    div.classList.add("cell");
    div.classList.add("r"+y);
    div.classList.add("s"+x);
    div.classList.add("b"+bClass[c]);
    div.id = "r"+y+"s"+x;
    div.innerHTML = "";
    div.style.color = "blue";
    div.onclick = function() {
        let n = prompt("Enter a number: ");
        this.style.color = "black";
        this.innerHTML = n;
        btn = document.getElementById("solver");
        btn.style.display = "block";
        btn.style.margin = "5 auto";
    };
    grid.appendChild(div);
    c++;
    if (x == 8) {
        x = 0;
        y++;
    }
    else {
        x++;
    }
}

function setup() {
    board = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        let cells = document.getElementsByClassName("r"+i);
        for (let j = 0; j < 9; j++) {
            row.push(cells[j].innerHTML);
        }
        board.push(row);
    }
    if (checkWholeBoard()) {
        alert("Invalid board!")
    }
    else {
        solve();
    }
}

function checkDup(array) {
    var a = [];
    for (let l = 0; l < 9; l++) {
        let item = array[l];
        if (a.includes(item)) {
            if (!(item === "")) {
                return true;
            }
        }
        a.push(item);
    }
    return false;
}

function checkWholeBoard() {
    for (let k = 0; k < 9; k++) {
        let r = board[k];
        if (checkDup(r)) {
            return true;
        }
    }
    for (let i = 0; i < 9; i++) {
        let col = document.getElementsByClassName("s"+i);
        var colText = [];
        for (let j = 0; j < 9; j++) {
            colText.push(col[j].innerHTML);
        }
        if (checkDup(colText)) {
            return true;
        }
    }
    for (let i = 0; i < 9; i++) {
        let block = document.getElementsByClassName("b"+i);
        var blockText = [];
        for (let j = 0; j < 9; j++) {
            blockText.push(block[j].innerHTML);
        }
        if (checkDup(blockText)) {
            return true;
        }
    }

    return false;
    
}

function checkMinimum(square) {
    for (let i = 5; i < 12; i+=3) {
        let classes = square.classList.value;
        let conflicts = document.getElementsByClassName(classes.substring(i,i+2));
        var conText = [];
        for (let j = 0; j < 9; j++) {
            conText.push(conflicts[j].innerHTML);
        }
        if (checkDup(conText)) {
            return true;
        }
    }
}

function solve() {
    numSolved = 0;
    document.getElementById("solver").innerHTML = "solving...";
    x = 0;
    y = 0;
    n = 1;

    while (numSolved < 81) {
        let currentSquare = document.getElementById("r"+y+"s"+x);
        if (currentSquare.innerHTML === "") {

            currentSquare.innerHTML = `${n}`;
            board[y][x] = n;

            if (checkMinimum(currentSquare)) {
                currentSquare.innerHTML = "";
                if (n == 9) {
                    moveBack();
                }
                else {
                    n++;
                }
                
            }
            else {

                numSolved++;
                console.log(numSolved);
                n = 1;
                
                if (x == 8) {
                    x = 0;
                    y++;
                }
                else {
                    x++;
                }
            }

        }
        else {
            numSolved++;
            console.log(numSolved);
            if (x == 8) {
                x = 0;
                if (y == 8) {
                    document.getElementById("solver").innerHTML = "solved";
                }
                else {
                    y++;
                }
            }
            else {
                x++;
            }
        }

    }

}

function moveBack() {
    if (x == 0) {
        x = 8;
        y--;
    }
    else {
        x--;
    }
    n = Number(document.getElementById("r"+y+"s"+x).innerHTML);
    n++;
    if (document.getElementById("r"+y+"s"+x).style.color == "black") {
        numSolved--;
        console.log(numSolved);
        moveBack();
    }
    else if (n > 9) {
        document.getElementById("r"+y+"s"+x).innerHTML = "";
        numSolved--;
        console.log(numSolved);
        moveBack();
    }
    else {
        document.getElementById("r"+y+"s"+x).innerHTML = "";
        numSolved--;
        console.log(numSolved);
    }
    
}