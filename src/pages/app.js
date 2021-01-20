import '/src/login.css'
import {logOut} from '/src/firebaseAuth';
export const app = (function(){

    function loadPage(user) {
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

