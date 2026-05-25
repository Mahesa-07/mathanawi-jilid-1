import { renderBab }
from "./render.js";

export function initRender(
babMap
){

const app=
document.getElementById(
"app"
);

if(!app) return;

const currentBab=

app.dataset.bab
|| "bab1";

const data=
babMap[currentBab];

if(!data) return;

app.innerHTML=
renderBab(data);

const hash=
window.location.hash;

if(hash){

setTimeout(()=>{

const target=
document.querySelector(
hash
);

if(target){

target.scrollIntoView({

behavior:"smooth",
block:"center"

});

target.classList.add(
"highlight"
);

setTimeout(()=>{

target.classList.remove(
"highlight"
);

},1200);

}

},300);

}

}