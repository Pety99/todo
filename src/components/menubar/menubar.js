import style from './style.module.css';
import hamburgerIcon from './assets/Hamburger.svg'

//Create the background of the menu
export const menubar = document.createElement('div');
console.log( `${style.menubar}`);
menubar.id = `${style.menubar}`;

//Create the haburger icon
const hamburger = document.createElement('img');
hamburger.classList.add(`${style.hamburger}`);
hamburger.src = hamburgerIcon;


menubar.appendChild(hamburger);

menubar.addEventListener('click', toggleShrink);

function toggleShrink(){
    if(menubar.classList.contains(`${style.small}`)){
        menubar.classList.remove(`${style.small}`);
    }
    else{
        menubar.classList.add(`${style.small}`);
    }
}

