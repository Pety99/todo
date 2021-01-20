import '/src/login.css'
export const login = (function(){

    function loadPage() {
        const content = document.querySelector('#firebaseui-auth-container');
        if (content) {
            content.classList = content.classList.remove('hidden');
        }
        else {
            createContent();
        }
    }
    
    function createContent() {
        const h1 = document.createElement('h1');
        h1.textContent = 'Welcome to My Awesome App';
        const container = document.createElement('div');
        container.id = 'firebaseui-auth-container';
        const loader = document.createElement('div');
        loader.id = 'loader';
        loader.textContent += 'Loading...';
        document.body.appendChild(h1);
        document.body.appendChild(container);
        document.body.appendChild(loader);
    }
        
    function hidePage() {
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('firebaseui-auth-container').classList.add('hidden');
    }

    return{
        loadPage,
        hidePage,
    }
})();