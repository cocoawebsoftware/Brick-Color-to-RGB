async function loadBrickColors() {
    const res = await fetch("./BrickColor.txt");
    const text = await res.text();

    const colors = {};

    text.split(/\r?\n/).forEach(line => {
        if (!line.trim()) return;

        const [name, id, rgb255, rgb1] = line.split("\t");

        const [r, g, b] = rgb255.split(",").map(v => Number(v.trim()));
        const [r1, g1, b1] = rgb1.split(",").map(v => Number(v.trim()));

        colors[name] = {
            name,
            id: Number(id),
            rgb255: { r, g, b },
            rgb01: { r: r1, g: g1, b: b1 }
        };
    });

    return colors;
}
