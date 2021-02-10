import style from './mainPanel.module.css';

import { button } from '../button/button';
import { todo } from '../todo/todo';
import tableDragger from 'table-dragger';

import nothingHere from './assets/NothingHere.svg';
import bin from './assets/Bin.svg';
import plus from './assets/Plus.svg';

let database;

let panel;
let container;
let title;
let placeholder;
let projectPlaceholder;
const deleteProjectButton = button();
const addTodoButton = button();

let categoris;
const allButton = button();
const urgentButton = button();
const importantButton = button();
const normalButton = button();

let todos;
let tbody;

let currentProjectKey;
let currentProject;
let todoCount = 0;

let dragger = undefined;

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
        projectPlaceholder = createProjectsPlaceholder();
        container.appendChild(projectPlaceholder);
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
        placeholder.classList.add(style.placeholder, style.visible);
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
        deleteProjectButton.createImage(bin, [() => database.deleteProject(currentProjectKey)], []);
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add(style.deleteButtonContainer);
        buttonContainer.appendChild(deleteProjectButton.getButton());
        topBar.appendChild(title);
        topBar.appendChild(buttonContainer);
        return topBar;
    }

    function createCategories() {
        categoris = document.createElement('div');
        categoris.classList.add(style.categories);
        normalButton.create("Normal", [() => categorySelected(normalButton.getButton()), () => openProject(currentProject, 'low')], [style.smallButton, style.low, style.unselected]);
        importantButton.create("Important", [() => categorySelected(importantButton.getButton()), () => openProject(currentProject, 'normal')], [style.smallButton, style.normal, style.unselected]);
        urgentButton.create("Urgent", [() => categorySelected(urgentButton.getButton()), () => openProject(currentProject, 'high')], [style.smallButton, style.high, style.unselected]);
        allButton.create("All", [() => categorySelected(allButton.getButton()), () => openProject(currentProject)], [style.smallButton, style.low]);
        normalButton.toggle();
        importantButton.toggle();
        urgentButton.toggle();
        allButton.toggle();
        categoris.appendChild(normalButton.getButton());
        categoris.appendChild(importantButton.getButton());
        categoris.appendChild(urgentButton.getButton());
        categoris.appendChild(allButton.getButton());
        return categoris;
    }

    function createTodosList() {
        todos = document.createElement('table');
        todos.id = 'table';
        todos.classList.add(style.todoList);
        tbody = document.createElement('tbody');
        tbody.classList.add(style.tbody);
        todos.appendChild(tbody);
        todos.appendChild(createPlaceholder());

        //Create some sample todo content
        /*const todo1 = todo();
        todo1.create({priority: 'high'});
        const todo2 = todo();
        todo2.create({priority: 'normal'});
        const todo3 = todo();
        todo3.create({priority: 'low'});
        const todo4 = todo();
        todo4.create({priority: 'low'});
        const todo5 = todo();
        todo5.create({priority: 'low'});
        const todo6 = todo();
        todo6.create({priority: 'low'});
        const todo7 = todo();
        todo7.create({priority: 'low'});
        const todo8 = todo();
        todo8.create({priority: 'low'});
        const todo9 = todo();
        todo9.create({priority: 'low'});
        const todo10 = todo();
        todo10.create({priority: 'low'});
        const todo11 = todo();
        todo11.create({priority: 'low'});
        const todo12 = todo();
        todo12.create({priority: 'low'});
        tbody.appendChild(todo1.getTodo());
        tbody.appendChild(todo2.getTodo());
        tbody.appendChild(todo3.getTodo());
        tbody.appendChild(todo4.getTodo());
        tbody.appendChild(todo5.getTodo());
        tbody.appendChild(todo6.getTodo());
        tbody.appendChild(todo7.getTodo());
        tbody.appendChild(todo8.getTodo());
        tbody.appendChild(todo9.getTodo());
        tbody.appendChild(todo10.getTodo());
        tbody.appendChild(todo11.getTodo());
        tbody.appendChild(todo12.getTodo());*/
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

    function createControls() {
        // Remove the placeholder, and cretae the controls and content of the page
        if (todos == undefined) {
            container.appendChild(createTopBar());
            container.appendChild(createCategories());
            container.appendChild(createTodosList());
            container.appendChild(createBottomBar());
            projectPlaceholder.remove();
        }
    }

    function clearTodos() {
        tbody.innerHTML = '';
    }

    function toggle() {
        if (panel.style.position == 'absolute') {
            panel.style.position = 'static';
        }
        else {
            panel.style.position = 'absolute';
        }
    }

    function categorySelected(button) {
        const categories = document.querySelectorAll(`.${style.smallButton}`);
        categories.forEach(category => {
            category.classList.add(style.unselected);
        });

        button.classList.remove(style.unselected);
    }

    function setTitle(text) {
        title.textContent = text;
    }

    function openProject(project, category) {
        todoCount = 0;
        currentProjectKey = project.key;
        currentProject = project;
        createControls(); //Create the buttons and the text of the page
        clearTodos(); // Delete the todos from the previous project
        if (category == undefined) {
            categorySelected(allButton.getButton());
        }
        setTitle(project.val().name);
        database.todoCreated(currentProjectKey, [(newTodo, listeners) => { createTodoView(newTodo, listeners, category); }, setupTableDragger]);
        //This 500 is just an arbitrary number, this should be a promise based solution
        setTimeout(function () {
            if (todoCount == 0) {
                placeholder.classList.add(style.visible);
            }
            else {
                placeholder.classList.remove(style.visible);
            }
        }, 200);

    }

    function closeProject() {
        clearTodos();
        container.innerHTML = '';
        todos = undefined; //This is checked when creating the controls
        projectPlaceholder = createProjectsPlaceholder();
        container.appendChild(projectPlaceholder);
    }

    function subscribeToDBEvents() {

    }

    //Public Database Event Listeners/////////////////////////////////////////////////////////////////

    /**
     * Creates the Todo View under the todoList
     * @param {object} newProject data of the new project
     * @param {*} listeners
     */
    function createTodoView(newTodo, listeners, priority) {

        //This is just the title of the project from the database
        if (newTodo.val() == title.textContent) {
            return;
        }
        const todoView = todo();
        if (priority == undefined || priority == newTodo.val().priority) {
            todoView.create(newTodo.val(), listeners, [() => database.deleteTodo(newTodo.key)], [() => database.toggleTodo(newTodo.key)]);
            tbody.appendChild(todoView.getTodo());
            todoCount++;
        }
    }

    function setupTableDragger() {
        if(dragger){
            dragger.destroy();
        }
        const el = document.getElementById('table');
        dragger = tableDragger(el, {
            mode: 'row',
            dragHandler: '.handle',
            onlyBody: true,
            animation: 150
        });
        dragger.on('drop', function (from, to) {

        });
    }

    function setDatabase(db) {
        database = db;
    }

    return {
        getPanel,
        toggle,
        createTodoView,
        openProject,
        closeProject,
        setDatabase
    }
})();

