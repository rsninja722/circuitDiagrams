function main() {
    var drag = {started: false, x: 0, y: 0, lastX: 0, lastY: 0};
    var mousePos = {x: 0, y: 0};
    var svgContainer = document.getElementById("editor-container");
    var svg = svgContainer.children[0];
    var mainSVG = SVG(svg);
    var nav = document.getElementsByClassName("navBar")[0];
    var navOffset = 0;
    var selected = 0;
    var scale = 1;
    
    function addListeners() {
        svgContainer.addEventListener("mousedown", mouseDown, false);
        window.addEventListener("mouseup", mouseUp, false);
        window.addEventListener("keydown", keyDown, false);
        window.addEventListener("wheel", mouseScroll);
        document.getElementById("navUp").addEventListener("click", navUp, false);
        document.getElementById("navDown").addEventListener("click", navDown, false);
        svg.addEventListener("mousemove", trackPosition, true);

    }

    function keyDown(e) {
        nav.getElementsByTagName("td")[selected].id = "";

        if(e.keyCode == 49) {
            selected = 0;
        } if(e.keyCode == 50) {
            selected = 1;
        }
        if(e.keyCode >= 51 && e.keyCode <= 57) {
            selected = e.keyCode - 49 + navOffset;
        }
        if(e.keyCode === 48) {
            selected = 9 + navOffset;
        }
        if(e.keyCode === 189) {
            selected = 10 + navOffset;
        }
        if(e.keyCode === 187) {
            selected = 11 + navOffset;
        }

        nav.getElementsByTagName("td")[selected - navOffset].id = "selected";
        setMouseSvg(selected,svg);
    }
    
    function mouseUp() {
        svgContainer.style.cursor = "";
        drag.started = false;
        window.removeEventListener("mousemove", moveWindow, true);
    }
    
    function mouseDown(e) {
        svgContainer.style.cursor = "grabbing";
        window.addEventListener("mousemove", moveWindow, true);
    }
    
    function moveWindow(e) {
        if(drag.started) {
            drag.x -= e.clientX*scale - drag.lastX;
            drag.y -= e.clientY*scale - drag.lastY;
            drag.lastX = e.clientX*scale;
            drag.lastY = e.clientY*scale;
            svg.setAttribute("viewBox", `${drag.x} ${drag.y} ${scale * 2000} ${scale * 2000}`); 
        } else {
            drag.started = true;
            drag.lastX = e.clientX*scale;
            drag.lastY = e.clientY*scale;
        }
    }

    function trackPosition(e) {
        mousePos.x = Math.round((e.clientX*scale + mainSVG.viewbox().x)) // / (20/scale)) * (20/scale);
        mousePos.y = Math.round((e.clientY*scale + mainSVG.viewbox().y)) // / (20/scale)) * (20/scale);

        var active = document.getElementById("active-svg");
        if(active) {
            active = SVG(active);            

            active.attr({x:  mousePos.x, y: mousePos.y});

            // if(active.transform.baseVal.length === 0) {
            //     active.transform.baseVal.appendItem(active.transform.baseVal.createSVGTransform(createSVGMatrix()));
            // }
            // active.transform.baseVal.getItem(0).setTranslate(mousePos.x, mousePos.y);
        }
    }

    function mouseScroll(e) {
        var oldScale = scale;
        scale += e.deltaY / 1000

        if(scale > 3.375) {
            document.getElementById("backgroundGrid").style.display = "none";
        } else {
            document.getElementById("backgroundGrid").style.display = "";
        }
        
        scale = Math.max(0.25, scale);
        
        drag.x -= (500 * (scale-oldScale));
        drag.y -= (500 * (scale-oldScale));

        svg.setAttribute("viewBox", `${drag.x} ${drag.y} ${scale * 2000} ${scale * 2000}`); 
    }

    function navUp() {
        if(navOffset + 10 < circuit.CIRCUIT_DEFS.length) {
            navOffset += 10;
            updateNav(navOffset);
        }
    }
    
    function navDown() {
        if(navOffset - 10 >= 0) {
            navOffset -= 10;
            updateNav(navOffset);
        }
    }

    window.onload = addListeners();
    updateNav(navOffset);
}

main();