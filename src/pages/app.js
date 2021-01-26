import '/src/style/global.css'
import {logOut} from '/src/firebaseAuth';
import {database} from '/src/firebaseDB';

import {menuBar} from '/src/components/menuBar/menuBar';
import {sideBar} from '/src/components/sideBar/sideBar';

export const app = (function(){

    function loadPage() {
        const content = document.querySelector('#sign-out');
        if (content) {
            content.classList.remove('hidden');
        }
        else {
            createContent();
            subscribeToClickEvents();
            subscribeToDBEvents();
        }
    }
    
    function createContent() {

        const content = document.querySelector('#content');

        /*
        const signOut = document.createElement('button');
        signOut.style.width = '50px';
        signOut.style.height = '50px';
        signOut.textContent = 'Sign Out';
        signOut.id = 'sign-out';
        signOut.addEventListener('click', logOut);
        */
 

        content.appendChild(menuBar.getPanel());
        content.appendChild(sideBar.getPanel());
        //content.appendChild(signOut);
    }

    function subscribeToClickEvents(){
        sideBar.addAddProjectListeners([database.createProject]);
    }

    function subscribeToDBEvents(){
        database.projectCreated([sideBar.createProjectView]);
    }

    function hidePage() {
        document.querySelector('#sign-out').classList.add('hidden');
    }

    return {
        loadPage,
        hidePage,
    }
})();

