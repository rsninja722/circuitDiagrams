class circuit {

    constructor(name, svg, connections, func) {
        this.name = name;
        this.svg = svg;
        this.connections = connections;
        this.func = func;
    }

    static CIRCUIT_SVGS = {
        AND: `<svg version="1.1" width="120" height="100" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="30" x2="35" y2="30" style="stroke-linecap:square;stroke-width:2" />
    <line x1="20" y1="50" x2="35" y2="50" style="stroke-linecap:square;stroke-width:2" />
    <path d="M 35,30 M 35,20 L 35,60 L 59,60 M 35,20 L 59,20 M 59,60 A 5,5 90 0 0 59,20" style="fill-opacity:0;stroke-linecap:square;stroke-width:2" />
    <line x1="81" y1="40" x2="90" y2="40" style="stroke-linecap:square;stroke-width:2" />
</svg>`,
        OR: `<svg version="1.1" width="120" height="100" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <line x1="30" y1="40" x2="45" y2="40" style="stroke-linecap:square;stroke-width:2" />
    <line x1="30" y1="60" x2="45" y2="60" style="stroke-linecap:square;stroke-width:2" />
    <path d="M 39,40 M 39,30 Q 59,50 39,70 M 38,70 Q 73,65 88,50 Q 73,35 38,30" style="fill-opacity:0;stroke-linecap:square;stroke-width:2" />
    <line x1="90" y1="50" x2="100" y2="50" style="stroke-linecap:square;stroke-width:2" />
</svg>`,
        NAND: `<svg version="1.1" width="120" height="100" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="40" x2="35" y2="40" style="stroke-linecap:square;stroke-width:2" />
    <line x1="20" y1="60" x2="35" y2="60" style="stroke-linecap:square;stroke-width:2" />
    <path d="M 35,40 M 35,30 L 35,70 L 59,70 M 35,30 L 59,30 M 59,70 A 5,5 90 0 0 59,30 M 80,50 A 2,2 -5 1 1 86,50 A 2,2 -5 1 1 80,50" style="fill-opacity:0;stroke-linecap:square;stroke-width:2" />
    <line x1="86" y1="50" x2="90" y2="50" style="stroke-linecap:square;stroke-width:2" />
</svg>`,
        NOR: `<svg version="1.1" width="120" height="100" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="30" x2="35" y2="30" style="stroke-linecap:square;stroke-width:2" />
    <line x1="20" y1="50" x2="35" y2="50" style="stroke-linecap:square;stroke-width:2" />
    <path d="M 29,30 M 29,20 Q 49,40 29,60 M 28,60 Q 63,55 78,40 Q 63,25 28,20 M 79,40 A 2,2 -5 1 1 85,40 A 2,2 -5 1 1 79,40" style="fill-opacity:0;stroke-linecap:square;stroke-width:2" />
    <line x1="85" y1="40" x2="90" y2="40" style="stroke-linecap:square;stroke-width:2" />
</svg>`,
        XOR: `<svg version="1.1" width="120" height="100" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="30" x2="35" y2="30" style="stroke-linecap:square;stroke-width:2" />
    <line x1="20" y1="50" x2="35" y2="50" style="stroke-linecap:square;stroke-width:2" />
    <path d="M 29,30 M 29,20 Q 49,40 29,60 M 37,20 Q 57,40 37,60 M 36,60 Q 71,55 86,40 Q 71,25 36,20" style="fill-opacity:0;stroke-linecap:square;stroke-width:2" />
    <line x1="85" y1="40" x2="90" y2="40" style="stroke-linecap:square;stroke-width:2" />
</svg>`,
        XNOR: `<svg version="1.1" width="120" height="100" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="30" x2="35" y2="30" style="stroke-linecap:square;stroke-width:2" />
    <line x1="20" y1="50" x2="35" y2="50" style="stroke-linecap:square;stroke-width:2" />
    <path d="M 29,30 M 29,20 Q 49,40 29,60 M 37,20 Q 57,40 37,60 M 36,60 Q 71,55 86,40 Q 71,25 36,20 M 87,40 A 2,2 -5 1 1 93,40 A 2,2 -5 1 1 87,40" style="fill-opacity:0;stroke-linecap:square;stroke-width:2" />
    <line x1="93" y1="40" x2="90" y2="40" style="stroke-linecap:square;stroke-width:2" />
</svg>`,
        NOT: `<svg version="1.1" width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="40" x2="27" y2="40" style="stroke-linecap:square;stroke-width:2" />
    <path d="M 29,30 M 29,40 L 29,58 L 57,40 L 29,22 L 29,40 M 57,40 A 2,2 -5 1 1 63,40 A 2,2 -5 1 1 57,40" style="fill-opacity:0;stroke-linecap:square;stroke-width:2" />
    <line x1="65" y1="40" x2="90" y2="40" style="stroke-linecap:square;stroke-width:2" />
</svg>`,
    };

    static CIRCUIT_DEFS = [
        new circuit("AND", circuit.CIRCUIT_SVGS.AND, [["A", "B"], ["C"]], (a, b) => a && b),
        new circuit("OR", circuit.CIRCUIT_SVGS.OR, [["A", "B"], ["C"]], (a, b) => a || b),
        new circuit("NAND", circuit.CIRCUIT_SVGS.NAND, [["A", "B"], ["C"]], (a, b) => !(a && b)),
        new circuit("NOR", circuit.CIRCUIT_SVGS.NOR, [["A", "B"], ["C"]], (a, b) => !(a || b)),
        new circuit("XOR", circuit.CIRCUIT_SVGS.XOR, [["A", "B"], ["C"]], (a, b) => a !== b),
        new circuit("XNOR", circuit.CIRCUIT_SVGS.XNOR, [["A", "B"], ["C"]], (a, b) => a === b),
        new circuit("NOT", circuit.CIRCUIT_SVGS.NOT, [["A"], ["C"]], (a) => !a),
        // new circuit("BUFFER", "BUFFER", [["A"], ["C"]], (a) => a),
        // new circuit("INVERTER", "INVERTER", [["A"], ["C"]], (a) => !a),
    ];
}