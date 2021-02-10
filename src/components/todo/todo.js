import style from './todo.module.css';
import { button } from '../button/button';

import bin from './assets/Bin.svg';

export const todo = (function () {


    let container;
    let checkbox;
    let hr;
    let row;
    let deleteButton = button();

    function getTodo() {
        return row;
    }

    function create(todo, clickListeners, binListeners, checkListeners) {

        //Create the todo
        row = document.createElement('tr');
        row.classList.add(style.row);
        container = document.createElement('td');
        container.classList.add(style.todo, style[todo.priority], 'handle');


        //The checkbox
        const label = document.createElement('label');
        label.classList.add(style['b-contain'], style[todo.priority]);
        if (todo.completed) {
            label.innerHTML = '<span></span><input type="checkbox" checked>';
        }
        else {
            label.innerHTML = '<span></span><input type="checkbox">';
        }

        checkbox = document.createElement('div');
        checkbox.classList.add(style['b-input']);
        label.appendChild(checkbox);
        container.appendChild(label);

        checkListeners && checkListeners.forEach(listener => {
            checkbox.addEventListener('click', listener);
        });
        checkbox.addEventListener('click', checkboxClick);

        //The name
        const name = document.createElement('p');
        name.classList.add(style.name);
        name.textContent = todo.name || 'Name';
        container.appendChild(name);

        //The Date
        const date = document.createElement('p');
        date.classList.add(style.date);
        date.textContent = todo.dueDate || 'Date';
        container.appendChild(date);

        //The delete button;
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add(style.buttonContainer);
        deleteButton.createImage(bin, [], []);
        buttonContainer.appendChild(deleteButton.getButton());
        container.appendChild(buttonContainer);

        buttonContainer.addEventListener('click', deleteClick);
        binListeners && (
            binListeners.forEach((listener) => {
                buttonContainer.addEventListener('click', listener);
            })
        );

        //The line
        hr = document.createElement('hr');
        hr.classList.add(style.line);
        container.appendChild(hr);
        if (todo.completed) {
            toggleLine();
        }

        row.appendChild(container);
        //Add the click listeners
        clickListeners && addListeners(clickListeners);

        //Animated
        row.classList.add(style.fadeOut);
        requestAnimationFrame(() => {
            row.classList.remove(style.fadeOut);
        });

        return container;
    }

    function deleteClick() {
        remove();
    }

    function checkboxClick() {
        toggleLine();
    }

    function toggleLine() {
        if (hr.classList.contains(style.visible)) {
            hr.classList.remove(style.visible);
        }
        else {
            hr.classList.add(style.visible);
        }
    }

    function addListener(listener) {
        container.addEventListener('click', listener);
    }

    function addListeners(listeners) {
        listeners && listeners.forEach(listener => {
            addListener(listener);
        });
    }

    /**
    * Removes the todo from the screen
    */
    function remove() {

        row.classList.add(style.fadeOut);
        container.classList.add(style.fadeOut);
        setTimeout(function () { row.remove() }, 200);
    }

    return {
        create,
        addListener,
        getTodo,
    }

});