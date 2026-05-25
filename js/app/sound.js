export function initClickSound(){

const clickSound=
document.getElementById(
"clickSound"
);

document.addEventListener(
"pointerdown",
(e)=>{

const target=
e.target.closest(
`
button,
.card,
a,
.search-item,
.icon-btn
`
);

if(!target) return;

if(clickSound){

clickSound.currentTime=0;

clickSound.play()
.catch(()=>{});

}

if(
navigator.vibrate
){

navigator.vibrate(8);

}

});

}