import style from './todo.module.css';
import { button } from '../button/button';

import bin from './assets/Bin.svg';

export const todo = (function () {

    let row;
    let deleteButton = button();

    function getTodo() {
        return row;
    }

    function create(todo, clickListeners) {

        //Create the todo
        row = document.createElement('tr');
        row.classList.add(style.row);
        const container = document.createElement('td');
        container.classList.add(style.todo, style[todo.priority], 'handle');
        container.innerHTML =
            `<label class="${style['b-contain']} ${style[todo.priority]}">
                <span></span>
                <input type="checkbox">
                <div class="${style['b-input']}"></div>
             </label>
             <p class="${style.name}">Name</p>
             <p class="${style.date}">Date</p>`;
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add(style.buttonContainer);
        deleteButton.createImage(bin, [], []);
        buttonContainer.appendChild(deleteButton.getButton());
        container.appendChild(buttonContainer);
        row.appendChild(container);
        //Add the click listeners
        clickListeners && addListeners(clickListeners);

        return container;
    }

    function addListener(listener) {
        row.addEventListener('click', listener);
    }

    function addListeners(listeners) {
        listeners && listeners.forEach(listener => {
            addListener(listener);
        });
    }

    return {
        create,
        addListener,
        getTodo,
    }

});