import style from './modal.module.css'

import { button } from '/src/components/button/button'

export const modal = (function () {

    let component;
    let successButton;
    let cancelButton;

    function getComponent() {
        return component;
    }

    function createProjectForm() {

        component = document.createElement('div');

        //If you click on the blurry background the component disappears
        component.addEventListener('click', function (event) {
            if (event.target == component) {
                remove();
            }
        });

        //The form will be removed on save
        successButton = button();
        cancelButton = button();
        successButton.create('Save');
        successButton.toggle();
        cancelButton.create('Cancel', [remove]);
        cancelButton.toggle();
        cancelButton.makeOutline();

        //The form
        const form = document.createElement('div');
        form.classList.add(style.form);
        form.innerHTML = `<label for="${style.projectName}">Name your Project</label>
        <input type="text" placeholder="Name..." id="${style.projectName}" required autofocus>`;

        // The buttons
        const buttons = document.createElement('div');
        buttons.classList.add(style.buttons);
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');

        buttons.appendChild(div1);
        buttons.appendChild(div2);
        div1.appendChild(successButton.getButton());
        div2.appendChild(cancelButton.getButton());
        form.appendChild(buttons);
        component.appendChild(form);

        //Animate fade in
        component.classList.add(style.fadeOut, style.background);
        requestAnimationFrame(() => {
            component.classList.remove(style.fadeOut);
        });
    }


    function createDeleteConfirmation() {

    }

    /**
     * Removes the modal window from the screen
     */
    function remove() {

        component.classList.add(style.fadeOut);
        setTimeout(function () { component.remove() }, 200);
    }


    function focus() {
        document.querySelector(`#${style.projectName}`).focus();
    }

    /**
     * Wraps the listeners into one function so that they will be called with the appropriate attributes
     */
    function wrappListeners(listeners) {
        return function () {
                const name = document.querySelector(`#${style.projectName}`).value;
                if (name) {
                    listeners.forEach(listener => {
                        listener({ name: name });
                    });
                    remove();
                }
                else {
                    /*Show popup*/
                }
            }
    }

    /**
     * Adds a listener to the success button
     * this listener will be called with a data object as an argument when the success button is clicked
     * @param {arrayOfFunctions} listener 
     */
    function addSucessListeners(listeners) {
        const sucessListener = wrappListeners(listeners);
        successButton.addListener(sucessListener);
        console.log('object');
    }

    return {
        getComponent,
        createProjectForm,
        focus,
        createDeleteConfirmation,
        addSucessListeners
    }

});