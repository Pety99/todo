import '/src/style/global.css'
import {logOut} from '/src/firebaseAuth';
import {database} from '/src/firebaseDB';
import tableDragger from 'table-dragger';

import {menuBar} from '/src/components/menuBar/menuBar';
import {sideBar} from '/src/components/sideBar/sideBar';
import {mainPanel} from '/src/components/mainPanel/mainPanel';

export const app = (function(){

    function loadPage(user) {
            createContent(user);
            subscribeToClickEvents();
            subscribeToDBEvents(); ////////////////////////////////// TODO MUST UNCOMMENT
            setupTableDragger();
    }
    
    function createContent(user) {
        const content = document.querySelector('#content');
        sideBar.initUser(user); //This will cahnge the default menu stuff specific to the user 
        content.appendChild(menuBar.getPanel());
        content.appendChild(sideBar.getPanel());
        content.appendChild(mainPanel.getPanel());
    }

    function subscribeToClickEvents(){
        sideBar.addAddProjectListeners([database.createProject]);
        sideBar.addSignOutListeners([logOut]);
    }

    function subscribeToDBEvents(){
        database.projectCreatedOnlyName([sideBar.createProjectView]);
    }

    function setupTableDragger(){
            var el = document.getElementById('table');
            var dragger = tableDragger(el, {
                mode: 'row',
                dragHandler: '.handle',
                onlyBody: true,
                animation: 300
            });
            dragger.on('drop', function (from, to) {

            });
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

