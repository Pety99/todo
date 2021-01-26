import '/src/style/global.css'
export const login = (function(){

    function loadPage() {
        const content = document.getElementById('login-container')
        if (content) {
            content.classList.remove('hidden');
        }
        else {
            createContent();
        }
    }
    
    function createContent() {

        const container = document.createElement('div');
        container.id = ('login-container')
        container.style = 'display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%';
        container.innerHTML = `
            <img src="https://via.placeholder.com/150" alt="Logo"></img>
            <div style="width: 100%">
                <div id="firebaseui-auth-container"></div>
                <div id="loader">Loading...</div>
            </div>
        `;
       document.body.appendChild(container);
    }
        
    function hidePage() {
        setTimeout(function () { document.getElementById('login-container').classList.add('hidden');},0);
    }

    return{
        loadPage,
        hidePage,
    }
})();