function setMouseSvg(selected,svg) {
    if(document.getElementById("active-svg")) {
        document.getElementById("active-svg").id = "";
    }

    var g = svg.getElementsByTagName("g")[0];

    g.innerHTML += circuit.CIRCUIT_DEFS[selected].svg;

    g.lastChild.id = "active-svg";
    
}