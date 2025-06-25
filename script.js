let r, g, b;
let color;
let currentPalette; // Track current palette function

let colorpalet = {
  purple_ish: (r, g, b) => `rgb(${r},18,${b})`,
  red_ish: (r, g, b) => `rgb(${r},0,0)`,
  blue_ish: (r, g, b) => `rgb(0,${g - 110},${b})`,
  green_ish: (r, g, b) => `rgb(0,${g},${b - 100})`,
  grey_ish: (r, g, b) => `rgb(${r - 10},${r - 10},${r - 10})`,
  orange_ish: (r, g, b) => `rgb(${r + 50},${g - 100},12)`
}

document.body.innerHTML = `
<div id="container"></div>
<div id="rectangle"></div>
<div id="blue-ish" class="color-select"></div>
<div id="green-ish" class="color-select"></div>
<div id="purple-ish" class="color-select"></div>
<div id="orange-ish" class="color-select"></div>
<div id="grey-ish" class="color-select"></div>
<div id="red-ish" class="color-select"></div>
<style>
body{ margin:0; overflow:hidden; }
#container{ display:flex; flex-wrap:wrap; width:100vw; height:100vh; }
.box:hover{ transform:translateY(10px) scale(1.1); }
.box{ box-sizing:border-box; }
</style>`

// Initialize current palette
currentPalette = colorpalet.purple_ish;

function rc() {
  r = Math.floor(Math.random() * 50 + 150);
  g = Math.floor(Math.random() * 50 + 150);
  b = Math.floor(Math.random() * 50 + 150);
  return currentPalette(r, g, b); // Use current palette
}

const min_size = 100;
const container = document.getElementById('container');

function createGrid() {
  container.innerHTML = '';
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const colums = Math.max(1, Math.floor(vw / min_size));
  const rows = Math.max(1, Math.floor(vh / min_size));

  const boxwidth = vw / colums;
  const boxheight = vh / rows;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < colums; j++) {
      const box = document.createElement('div');
      box.className = 'box';
      box.style.width = `${boxwidth}px`;
      box.style.height = `${boxheight}px`;
      box.style.background = `${rc()}`;
      box.style.boxShadow = `10px 20px 30px 50px ${rc()}`;
      container.appendChild(box);
    }
  }
}

function changecolor() {
  const elements = document.querySelectorAll('.box');
  elements.forEach((el,index) => {
  setTimeout(()=>{ 
      el.style.background = `${rc()}`;
      el.style.boxShadow = `10px 20px 30px 50px ${rc()}`;
  },10*index)
  });
}



// Add button event listeners
document.querySelectorAll('.color-select').forEach(btn => {
  btn.addEventListener('click', () => {
    const paletteName = btn.id.replace('-', '_') + ''; // Convert id to palette key
    currentPalette = colorpalet[paletteName]; // Update current palette
    changecolor(); // Immediately apply new palette
  });
});

setInterval(() => {
  changecolor();
}, 2000);

createGrid();

window.addEventListener('resize', createGrid); // Fixed: remove parentheses