const playerFactory = (name, marker) => {
    return {name, marker};
}

var p1 = playerFactory("", "X");
var p2 = playerFactory("", "O");

const playPage = document.querySelector("div.play.page");
const p1Name = document.getElementById("p1-name");
const p1Marker = document.getElementById("p1-marker");
const p2Name = document.getElementById("p2-name");
const p2Marker = document.getElementById("p2-marker");

const gameBoard = (() => {
    // Private
    const cellFactory = (pos) => {
        const p = document.querySelector(`[data-position = "${pos}"]`);
        const div = p.parentNode;
        return({pos, div, p});
    };

    // Public
    const cells = [0,1,2,3,4,5,6,7,8].map(
        (i) => cellFactory(i)
    );
    const reset  = () => {
        cells.forEach((cell) => {
            cell.div.classList.remove("played");
            cell.p.innerHTML = "";
            cell.p.classList.remove("win")
        })
    };

    return({cells, reset})
})();

const displayController = (() => {
    let activePlayer = 0;
    let players = [];
    const winningLines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [6,4,2]
    ]

    const win = (cell1, cell2, cell3) => {
        cell1.p.classList.add("win");
        cell2.p.classList.add("win");
        cell3.p.classList.add("win");
        gameBoard.cells.forEach(cell => {
            cell.div.classList.add("played");
        })
    }
    const checkWin = () => {
        winningLines.forEach((line) => {
            if(gameBoard.cells[line[0]].p.innerHTML.length == 0){
                return;
            }
            let marker = gameBoard.cells[line[0]].p.innerHTML;
            if(gameBoard.cells[line[1]].p.innerHTML == marker && gameBoard.cells[line[2]].p.innerHTML == marker){
                win(gameBoard.cells[line[0]], gameBoard.cells[line[1]], gameBoard.cells[line[2]])
            }
        })
    }    
    const play = (cell) => {
        if(cell.div.classList.contains("played")) {
            return;
        }
        cell.p.innerHTML = players[activePlayer].marker;
        cell.div.classList.add("played");
        checkWin();
        activePlayer = (activePlayer == 0) ? 1 : 0;
    };
    const setPlayers = (p1, p2) => {
        players[0] = p1;
        players[1] = p2;
        document.getElementById("p1-heading").innerHTML = p1.name + " : " + p1.marker;
        document.getElementById("p2-heading").innerHTML = p2.name + " : " + p2.marker;
    }
    const reset = () => {
        gameBoard.reset();
        activePlayer = 0;

        p1Name.value = players[0].name;
        p1Marker.value  = players[0].marker;
        p2Name.value = players[1].name;
        p2Marker.value = players[1].marker;
        playPage.classList.remove("visible");
    }

    return({play, setPlayers, reset})
})();


document.querySelector("button.setup.start").addEventListener("click", ()=>{
    if(p1Name.value.length <= 0 || p1Marker.value.length <= 0 
        || p2Name.value.length <= 0 || p2Marker.value.legnth <= 0)
    {
        alert("Please ensure each text field is filled");
    } else if (p1Marker.length > 1 || p2Marker.legnth > 0) {
        alert("Please use single char for marker");
    } else {
        p1 = playerFactory(p1Name.value, p1Marker.value);
        p2 = playerFactory(p2Name.value, p2Marker.value);
        displayController.setPlayers(p1, p2);
        playPage.classList.add("visible");
    }
});

document.querySelector("button.play.reset").addEventListener("click", () =>{
    displayController.reset();
});

gameBoard.cells.forEach((cell) => {
    cell.div.addEventListener("click", () => displayController.play(cell))
});
