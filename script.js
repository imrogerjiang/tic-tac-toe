var p1;
var p2;

const playerFactory = (name, marker) => {
    return {name, marker};
}

const gameBoard = (() => {
    const cellFactory = (pos) => {
        const p = document.querySelector(`[data-position = "${pos}"]`);
        const div = p.parentNode;
        return({div, p});
    };

    const play = (pos, char) => {
        if(typeof(pos) !== "number"){
            throw "invalid position";
        }
        const cell = cellFactory(pos);
        cell.p.innerHTML = char;
        cell.div.classList.add("played");
    };
    const reset  = () => {
        const allCells = document.querySelectorAll("[data-position]");
        allCells.forEach((e) => {
            const currCell = cellFactory(e.dataset.position);
            currCell.div.classList.remove("played");
            currCell.p.innerHTML = "";
        })
    };

    return({play, reset})
})();


document.querySelector("button.setup.start").addEventListener("click", ()=>{
    const playPage = document.querySelector("div.play.page");
    const p1Name = document.getElementById("p1-name").value;
    const p1Marker = document.getElementById("p1-marker").value;
    const p2Name = document.getElementById("p2-name").value;
    const p2Marker = document.getElementById("p2-marker").value;

    if(p1Name.length <= 0 || p1Marker.length <= 0 || p2Name.length <= 0 || p2Marker.legnth <= 0){
        alert("Please ensure each text field is filled");
    } else if (p1Marker.length > 1 || p2Marker.legnth > 0) {
        alert("Please use single char for marker");
    } else {
        p1 = playerFactory(p1Name, p1Marker);
        p2 = playerFactory(p2Name, p2Marker);
        document.getElementById("p1-heading").innerHTML = p1.name + " : " + p1.marker;
        document.getElementById("p2-heading").innerHTML = p2.name + " : " + p2.marker;
        playPage.classList.add("visible");
    }
})

