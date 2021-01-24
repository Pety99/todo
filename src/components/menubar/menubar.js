import style from './menuBar.module.css';
import hamburgerIcon from './assets/Hamburger.svg'

import { sideBar } from '/src/components/sideBar/sideBar';

export const menuBar = (function () {
    //Create the background of the menu
    const panel = document.createElement('div');
    panel.id = style.menuBar;

    //Create the haburger icon
    const hamburger = document.createElement('img');
    hamburger.classList.add(style.hamburger);
    hamburger.src = hamburgerIcon;

    panel.appendChild(hamburger);

    function getPanel() {
        return panel;
    }

    function toggleShrink() {
        if (panel.classList.contains(style.small)) {
            panel.classList.remove(style.small);
        }
        else {
            panel.classList.add(style.small);
        }
    }

    //Event Listeners

    //When you click outside the sidebar, on the right side
    sideBar.getPanel().addEventListener('click', function (event) {
        if (event.target == sideBar.getPanel()) {
            toggleShrink();
            sideBar.toggle();
        }
    });

    //When you click on the hamburger icon
    hamburger.addEventListener('click', function () {
        toggleShrink();
        sideBar.toggle();
    });

    return {
        getPanel,
    }

})();












