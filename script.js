console.log("script.js loaded");

const sel = document.getElementById("brick");
const rEl = document.getElementById("r");
const gEl = document.getElementById("g");
const bEl = document.getElementById("b");
const preview = document.getElementById("preview");

let brickData = {};

async function loadBrickColors() {
    const res = await fetch("BrickColor.txt");
    console.log("fetch status:", res.status);

    const text = await res.text();

    text.split(/\r?\n/).forEach(line => {
        if (!line.trim()) return;

        // Name\tID\tR,G,B\tR,G,B(0–1)
        const [name, id, rgb255] = line.split("\t");
        if (!rgb255) return;

        const [r, g, b] = rgb255.split(",").map(v => Number(v.trim()));
        brickData[name] = { r, g, b };
    });
}

function show(name) {
    const c = brickData[name];
    if (!c) return;

    rEl.textContent = c.r;
    gEl.textContent = c.g;
    bEl.textContent = c.b;
    preview.style.background = `rgb(${c.r},${c.g},${c.b})`;
}

loadBrickColors().then(() => {
    Object.keys(brickData).forEach(name => {
        const opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name;
        sel.appendChild(opt);
    });

    sel.addEventListener("change", () => show(sel.value));
    show(sel.value);
});
