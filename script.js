const nameInput = document.getElementById("nameInput");
const modeSel = document.getElementById("mode");
const resultDiv = document.getElementById("result");
const preview = document.getElementById("preview");

let brickData = {};
let dataLoaded = false;

// 絶対URLで読み込む
const DATA_URL = "https://cocoawebsoftware.github.io/Brick-Color-to-RGB/BrickColor.txt";

async function loadData(){
  try {
    const res = await fetch(DATA_URL);
    console.log("fetch status:", res.status);
    const text = await res.text();

    text.split(/\r?\n/).forEach(line => {
      if (!line.trim()) return;
      const parts = line.split("\t");
      if (parts.length < 3) return;

      const name = parts[0].trim();
      const rgb255 = parts[2].trim();
      const [r,g,b] = rgb255.split(",").map(v => Number(v.trim()));

      brickData[name.toLowerCase()] = { r, g, b };
    });

    dataLoaded = true;
    console.log("BrickColor loaded:", Object.keys(brickData).length);
  }
  catch(e){
    console.error("データ読み込みエラー:", e);
  }
}

function findBrick(name){
  return brickData[name.toLowerCase()];
}

function rgbToHex(r,g,b){
  return "#" + [r,g,b].map(x =>
    x.toString(16).padStart(2,"0")
  ).join("");
}

function rgbToHsv(r,g,b){
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b);
  const min=Math.min(r,g,b);
  const d=max-min;
  let h=0;

  if(d!==0){
    if(max===r) h=((g-b)/d)%6;
    else if(max===g) h=(b-r)/d+2;
    else h=(r-g)/d+4;
    h=Math.round(h*60);
    if(h<0) h+=360;
  }

  const s=max===0?0:Math.round(d/max*100);
  const v=Math.round(max*100);
  return {h,s,v};
}

function createGrid(labels, values){
  const wrapper=document.createElement("div");
  wrapper.className="rgb-grid";

  labels.forEach((label,i)=>{
    const box=document.createElement("div");
    box.className="rgb-box";

    const l=document.createElement("span");
    l.className="rgb-label";
    l.textContent=label;

    const num=document.createElement("span");
    num.className="rgb-value";
    num.textContent=values[i];

    box.appendChild(l);
    box.appendChild(num);
    wrapper.appendChild(box);
  });

  resultDiv.appendChild(wrapper);
}

function show(){
  if(!dataLoaded) return;

  const input=nameInput.value.trim();
  resultDiv.innerHTML="";
  preview.style.backgroundColor="transparent";
  if(!input) return;

  const c=findBrick(input);
  if(!c) return;

  preview.style.backgroundColor=`rgb(${c.r},${c.g},${c.b})`;

  if(modeSel.value==="rgb"){
    createGrid(["R","G","B"],[c.r,c.g,c.b]);
  }
  else if(modeSel.value==="rgb01"){
    createGrid(["R","G","B"],[
      (c.r/255).toFixed(3),
      (c.g/255).toFixed(3),
      (c.b/255).toFixed(3)
    ]);
  }
  else if(modeSel.value==="hsv" || modeSel.value==="hsb"){
    const hsv=rgbToHsv(c.r,c.g,c.b);
    createGrid(["H","S","V"],[hsv.h,hsv.s,hsv.v]);
  }
  else if(modeSel.value==="hex"){
    const div=document.createElement("div");
    div.className="out";
    div.textContent=rgbToHex(c.r,c.g,c.b);
    resultDiv.appendChild(div);
  }
}

nameInput.addEventListener("input",show);
modeSel.addEventListener("change",show);

loadData();
