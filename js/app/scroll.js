export function initHeaderHide(){

const header=
document.querySelector(
".app-header"
);

if(!header) return;

let lastScroll=0;

window.addEventListener(
"scroll",
()=>{

const current=
window.scrollY;

if(
current>
lastScroll &&
current>80
){

header.classList.add(
"hide"
);

}else{

header.classList.remove(
"hide"
);

}

lastScroll=
current;

});

}


export function initReadingProgress(){

const progressBar=
document.getElementById(
"readingProgress"
);

if(!progressBar)
return;

window.addEventListener(
"scroll",
()=>{

const scrollTop=
window.scrollY;

const docHeight=

document.body
.scrollHeight-

window.innerHeight;

const progress=

docHeight>0

?

(
scrollTop/
docHeight
)*100

:0;

progressBar.style.width=

progress+"%";

});

}