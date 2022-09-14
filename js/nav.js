function updateNav(offset) {
    var nav = document.getElementsByClassName("navBar")[0];
    
    var cells = nav.getElementsByTagName("tr")[0].children;

    for(var i = 0; i < cells.length; i++) {
        var c = circuit.CIRCUIT_DEFS[i + offset];
        if(c === undefined) {
            break;
        }
        var cell = cells[i + (nav > 0 ? 0 : 2)]; 
        cell.children[0].innerHTML = c.svg;
        cell.children[1].innerText = c.name;
    }
}