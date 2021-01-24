import style from './button.module.css'

export const button = (function () {
    
    let button;
    
    function getButton(){
        return button;
    }

    function create(text, listeners){
        button = document.createElement('button');
        button.type = 'button';
        button.textContent = text;
        button.classList.add(style.button);

        listeners && listeners.forEach(listener => {
            button.addEventListener('click', listener);
        });
    }


    function toggle(){
        if (button.classList.contains(style.visible)) {
            button.classList.remove(style.visible);
        }
        else {
            button.classList.add(style.visible);
        }
    }

    return {
        getButton,
        create,
        toggle,
    }

});