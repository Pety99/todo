import style from './button.module.css';

export const button = (function () {
    
    let button;
    
    function getButton(){
        return button;
    }

    function create(text, clickListeners, extraClasses){

        //Create the button
        button = document.createElement('button');
        button.type = 'button';
        button.textContent = text;
        button.classList.add(style.button);
        extraClasses && button.classList.add(...extraClasses);

        //Add the click listeners
        clickListeners && addListeners(clickListeners);
    }

    function makeOutline(){
        button.classList.add(style.outline);
    }


    function toggle(){
        if (button.classList.contains(style.visible)) {
            button.classList.remove(style.visible);
        }
        else {
            button.classList.add(style.visible);
        }
    }

    function addListener(listener){
        button.addEventListener('click', listener);
    }

    function addListeners(listeners){
        listeners && listeners.forEach(listener => {
            addListener(listener);
        });
    }

    return {
        getButton,
        create,
        makeOutline,
        toggle,
        addListener
    }

});