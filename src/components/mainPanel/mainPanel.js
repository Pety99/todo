import style from './mainPanel.module.css';

import {button} from '../button/button';
import {todo} from '../todo/todo';
import tableDragger from 'table-dragger';

import nothingHere from './assets/NothingHere.svg';
import bin from './assets/Bin.svg';
import plus from './assets/Plus.svg';

let panel;
let container;
let title;
let placeholder
const deleteProjectButton = button();
const addTodoButton = button();
let categoris;
let todos;

export const mainPanel = (function () {

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
        panel.classList.add(style.mainPanel);
        panel.classList.add(style.visible);
        container = document.createElement('div');
        container.classList.add(style.container);
        container.classList.add(style.visible);
        container.appendChild(createTopBar());
        container.appendChild(createCategories());
        container.appendChild(createTodosList());
        container.appendChild(createBottomBar());
        /*container.appendChild(createProjectsPlaceholder());*/
        panel.appendChild(container);
    }

    function createPlaceholder() {
        placeholder = document.createElement('div');
        placeholder.classList.add(style.placeholder);
        placeholder.id = 'placeholder';
        placeholder.innerHTML = `<h1>No Todos, yet!</h1>
                                 <h2>Click on the + button to add a new Todo!</h2>
                                 <img src="${nothingHere}">`;
        return placeholder;
    }

    function createProjectsPlaceholder() {
        placeholder = document.createElement('div');
        placeholder.classList.add(style.placeholder);
        placeholder.id = 'placeholder';
        placeholder.innerHTML = `<h1>There's nothing here!</h1>
                                 <h2>Open a project to see your Todos!</h2>
                                 <img src="${nothingHere}">`;
        return placeholder;
    }

    function createTopBar() {
        const topBar = document.createElement('div');
        topBar.classList.add(style.topBar);
        title = document.createElement('h1');
        title.textContent = 'Title';
        deleteProjectButton.createImage(bin, [], []);
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add(style.deleteButtonContainer);
        buttonContainer.appendChild(deleteProjectButton.getButton());
        topBar.appendChild(title);
        topBar.appendChild(buttonContainer);
        return topBar;
    }

    function createCategories() {
        categoris = document.createElement('div');
        categoris.classList.add(style.categoris);
        return categoris;
    }

    function createTodosList() {
        todos = document.createElement('table');
        todos.id = 'table';
        todos.classList.add(style.todoList);
        const tbody = document.createElement('tbody');
        todos.appendChild(tbody);
        /*todos.appendChild(createPlaceholder());*/
      
        //Create some sample todo content
        const todo1 = todo();
        todo1.create({priority: 'high'});
        const todo2 = todo();
        todo2.create({priority: 'normal'});
        const todo3 = todo();
        todo3.create({priority: 'low'});
        tbody.appendChild(todo1.getTodo());
        tbody.appendChild(todo2.getTodo());
        tbody.appendChild(todo3.getTodo());
      return todos;       
    }

    function createBottomBar() {
        const bottomBar = document.createElement('div');
        bottomBar.classList.add(style.bottomBar);
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add(style.addButtonContainer);
        addTodoButton.createImage(plus, [], []);
        buttonContainer.appendChild(addTodoButton.getButton());
        bottomBar.appendChild(buttonContainer);

        return bottomBar;
    }

    return {
        getPanel,
    }
})();

