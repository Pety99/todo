import '/src/style/global.css'
import {logOut} from '/src/firebaseAuth';
import {database} from '/src/firebaseDB';

import {menuBar} from '/src/components/menuBar/menuBar';
import {sideBar} from '/src/components/sideBar/sideBar';

export const app = (function(){

    function loadPage(user) {
            createContent(user);
            subscribeToClickEvents();
            subscribeToDBEvents(); ////////////////////////////////// TODO MUST UNCOMMENT
    }
    
    function createContent(user) {
        const content = document.querySelector('#content');
        sideBar.initUser(user); //This will cahnge the default menu stuff specific to the user 
        content.appendChild(menuBar.getPanel());
        content.appendChild(sideBar.getPanel());
    }

    function subscribeToClickEvents(){
        sideBar.addAddProjectListeners([database.createProject]);
        sideBar.addSignOutListeners([logOut]);

    }

    function subscribeToDBEvents(){
        database.projectCreatedOnlyName([sideBar.createProjectView]);
    }

    function hidePage() {
        const content = document.querySelector('#content');
        content.remove();
    }

    return {
        loadPage,
        hidePage,
    }
})();

