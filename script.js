console.log("script.js loaded");

const nameInput = document.getElementById("nameInput");
const modeSel   = document.getElementById("mode");
const resultDiv = document.getElementById("result");
const preview   = document.getElementById("preview");

let brickData = {};

// ---------- 変換 ----------
function rgbToHex(r,g,b){
  return "#" + [r,g,b].map(v => v.toString(16).padStart(2,"0")).join("");
}

function rgbToHsv(r,g,b){
  r/=255; g/=255; b/=255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  const d = max - min;
  let h = 0;

  if (d !== 0) {
    if (max === r) h = ((g-b)/d) % 6;
    else if (max === g) h = (b-r)/d + 2;
    else h = (r-g)/d + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : d / max;
  const v = max;

  return { h, s: Math.round(s*100), v: Math.round(v*100) };
}

// ---------- 検索（大文字小文字無視） ----------
function findBrick(name){
  const key = Object.keys(brickData).find(
    k => k.toLowerCase() === name.toLowerCase()
  );
  return key ? brickData[key] : null;
}

// ---------- 表示 ----------
function show(){
  const input = nameInput.value.trim();
  resultDiv.innerHTML = "";

  if (!input) {
    preview.style.background = "transparent";
    return;
  }

  const c = findBrick(input);
  if (!c) {
    preview.style.background = "transparent";
    return;
  }

  preview.style.background = `rgb(${c.r},${c.g},${c.b})`;

  let text = "";
  if (modeSel.value === "rgb") {
    text = `rgb(${c.r}, ${c.g}, ${c.b})`;
  } else if (modeSel.value === "hex") {
    text = rgbToHex(c.r,c.g,c.b);
  } else {
    const hsv = rgbToHsv(c.r,c.g,c.b);
    text = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
  }

  const div = document.createElement("div");
  div.className = "out";

  const code = document.createElement("code");
  code.textContent = text;

  const btn = document.createElement("button");
  btn.textContent = "Copy";
  btn.onclick = () => navigator.clipboard.writeText(text);

  div.appendChild(code);
  div.appendChild(btn);
  resultDiv.appendChild(div);
}

// ---------- データ読み込み ----------
async function loadBrickColors(){
  const res = await fetch("BrickColor.txt");
  console.log("fetch status:", res.status);

  const text = await res.text();
  text.split(/\r?\n/).forEach(line => {
    if (!line.trim()) return;
    // Name\tID\tR,G,B\tR,G,B(0–1)
    const [name, id, rgb255] = line.split("\t");
    if (!rgb255) return;
    const [r,g,b] = rgb255.split(",").map(v => Number(v.trim()));
    brickData[name] = { r,g,b };
  });
}

// ---------- 初期化 ----------
loadBrickColors().then(() => {
  nameInput.addEventListener("input", show);
  modeSel.addEventListener("change", show);
});
