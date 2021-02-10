import style from './detailsPanel.module.css';

import { button } from '../button/button';

import nothingHere from './assets/NothingHere.svg';

let panel;
let container;
let title;
let placeholder
const deleteProjectButton = button();
const addTodoButton = button();
let categoris;

export const detailsPanel = (function () {

    /**
      * This will create the main parts of the panel before using it
      */
    const initPanel = (function () {
        createPanel();
    })();

    function getPanel() {
        return panel;
    }

    function createPanel() {
        panel = document.createElement('div');
        panel.classList.add(style.detailsPanel);
        panel.classList.add(style.visible);
        container = document.createElement('div');
        container.classList.add(style.container);
        container.classList.add(style.visible);
        panel.appendChild(container);
    }

    function createCategories() {
        categoris = document.createElement('div');
        categoris.classList.add(style.categoris);
        return categoris;
    }

    function toggle() {
        if (panel.style.position == 'absolute') {
            panel.style.position = 'static';
        }
        else {
            panel.style.position = 'absolute';
        }
    }

    return {
        getPanel,
        toggle,
    }
})();

