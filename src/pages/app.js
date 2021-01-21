import '/src/style/global.css'
import {logOut} from '/src/firebaseAuth';
import {database} from '/src/firebaseDB';

import {menubar} from '/src/components/menubar/menubar';

export const app = (function(){

    function loadPage() {
        const content = document.querySelector('#sign-out');
        if (content) {
            content.classList.remove('hidden');
        }
        else {
            createContent();
        }
    }
    
    function createContent() {
        const signOut = document.createElement('button');
        signOut.style.width = '50px';
        signOut.style.height = '50px';
        signOut.textContent = 'Sign Out';
        signOut.id = 'sign-out';
        signOut.addEventListener('click', logOut);
        document.body.appendChild(menubar);
        document.body.appendChild(signOut);
    }

    function hidePage() {
        document.querySelector('#sign-out').classList.add('hidden');
    }

    return {
        loadPage,
        hidePage,
    }
})();

