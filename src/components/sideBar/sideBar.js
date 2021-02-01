import profilePicture from './assets/Profile.svg'
import today from './assets/Today.svg'
import projects from './assets/Projects.svg'
import arrow from './assets/Arrow.svg'
import dot from './assets/Dot.svg'

import style from './sideBar.module.css'

import {button} from '/src/components/button/button'
import {modal} from '/src/components/modal/modal'

export const sideBar = (function () {


    let sidePanel;
    let container;
    let profileContainer;
    let dayView;
    let dropdown;
    let dropdownContent; //This is the div that cotains the projects
    const addButton = button();
    const signOutButton = button();
    const addProjectSucessListeners = []; //These functions will be called when the addProject is saved
    

    /**
     * This will create the main parts of the sidebar before using it
     */
    const initPanel = (function () {
        createPanel();
        profileContainer = createProfile();
        dayView = createDayView();
        dropdown = createDropdown([turnArrow, toggleDropdown, toggleBottomBar]);
        addButton.create('Add Project', [openModal]);
        signOutButton.create('Sign Out', null, [`${style.signOut}`]);
        signOutButton.makeOutline();

        container.appendChild(profileContainer);
        container.appendChild(dayView);
        container.appendChild(dropdown);
        container.appendChild(addButton.getButton());
        container.appendChild(signOutButton.getButton());
    })();

    function getPanel() {
        return sidePanel;
    }

    /**
     * Shows or hides the whhole panel with its components
     */
    function toggle() {
        
        addButton.toggle();
        signOutButton.toggle();

        if (sidePanel.classList.contains(style.visible)) {
            sidePanel.classList.remove(style.visible);
            container.classList.remove(style.visible);
            profileContainer.classList.remove(style.visible);
            dayView.classList.remove(style.visible);
            dropdown.classList.remove(style.visible);
        }
        else {
            sidePanel.classList.add(style.visible);
            container.classList.add(style.visible);
            profileContainer.classList.add(style.visible);
            dayView.classList.add(style.visible);
            dropdown.classList.add(style.visible);
        }
    }

    /**
     * Creates the sidepanel
     */
    function createPanel() {
        sidePanel = document.createElement('div');
        sidePanel.classList.add(style.sidePanel);
        container = document.createElement('div');
        container.classList.add(style.container);
        sidePanel.appendChild(container);
    }

    /**
     * Creates the profile section in the sidepanel
     */
    function createProfile(user) {
        const profileContainer = document.createElement('div');
        profileContainer.classList.add(style.profileContainer);
        profileContainer.innerHTML =
            `<img id="${user && user.photoURL && style.profilePicture}" src="${ user && user.photoURL|| profilePicture}" alt="Profile Picture">
        <p id="welcome-message">Welcome Back ${user && user.displayName.split(' ')[0] || ''}</p>`;
        return profileContainer;
    }

    /**
     * Currently creates the today button, more can be added
     */
    function createDayView() {
        const dayViewContainer = document.createElement('div');
        dayViewContainer.classList.add(style.dayViewContainer);
        dayViewContainer.appendChild(createDay('Today', today, false /*TODO listener a mai napokra */));
        return dayViewContainer;
    }

    /**
     * Creates a dayView
     * @param {string} name 
     * @param {svg} svg 
     * @param {boolean} addArrow 
     * @param {arrayOfFunctions} listeners 
     */
    function createDay(name, svg, addArrow, listeners) {
        const day = document.createElement('div');
        day.classList.add(style.day);
        day.innerHTML = `<img src="${svg}" alt="${name}"><div class="${style.dayText}"><p>${name}</p></div>`;
        if(addArrow){
            day.innerHTML = `<img src="${svg}" alt="${name}"><div class="${style.dayText}"><p>${name}</p><img src="${arrow}"alt="Arrow" class="${style.arrow}"></div>`;
        }

        listeners && listeners.forEach(listener => {
            day.addEventListener('click', listener);
        });

        return day;
    }

    /**
     * Creates the dropdown menu
     * @param {arrayOfFunctions} listeners 
     */
    function createDropdown(listeners) {
        const dropdown = document.createElement('div');
        dropdown.classList.add(style.dropdown);
        const project = createDay('Projects', projects, true, listeners);
        dropdown.appendChild(project);
        const hr1 = document.createElement('hr');
        hr1.classList.add(style.hrTop);
        dropdown.appendChild(hr1);
        dropdownContent = document.createElement('div');
        dropdownContent.classList.add(style.dropdownContent);
        dropdown.appendChild(dropdownContent);
        const hr2 = document.createElement('hr');
        hr2.classList.add(style.hrBottom);
        dropdown.appendChild(hr2);
        return dropdown;
    }

    /**
     * Creates a project
     * @param {string} name 
     * @param {arrayOfFunctions} listeners 
     */
    function createProject(name, listeners) {
        const project = document.createElement('div');
        project.classList.add(style.project);
        project.innerHTML = `<img src="${dot}" alt="Project">
        <p>${name}</p>`;
        listeners && listeners.forEach(listener => {
            project.addEventListener('click', listener);
        });
        return project;
    }

    //Public Database Event Listeners/////////////////////////////////////////////////////////////////

    /**
     * Creates the Project View under the project dropdown
     * @param {object} newProject data of the new project
     * @param {*} listeners
     */
    function createProjectView(newProject, listeners){
        dropdownContent.appendChild(createProject(newProject.name));
    }

    /**
     * Changes the default profile picture of the users profile picture
     * Updates the welcome message
     * The set timeout is necessary because the profile ocntainer can only be selected after the div was created
     * @param {object} newUser 
     */
    function initUser(newUser){
        setTimeout(function () {
            const newProfile = createProfile(newUser);
            const currentProfile = document.querySelector(`.${style.profileContainer}`);
            currentProfile.parentNode.replaceChild(newProfile, currentProfile);
            profileContainer = newProfile;
        },0);
    }

    //Public click Event Listeners/////////////////////////////////////////////////////////////////

    /**
     * Adds the listeners which will be called when the save button is clicked on project add
     * @param {arrayOfFunctions} listeners 
     */
    function addAddProjectListeners(listeners) {
        listeners && addProjectSucessListeners.push(...listeners);
    }

    function addSignOutListeners(listeners) {
        listeners && listeners.forEach(listener => {
            signOutButton.addListener(listener);
        });
    }

    //Private Event Listeners/////////////////////////////////////////////////////////////////

    //Projects Button
    function turnArrow(event) {
        const arrow = document.querySelector(`.${style.arrow}`);
        if (arrow.classList.contains(style.rotated)) {
            arrow.classList.remove(style.rotated);
        }
        else {
            arrow.classList.add(style.rotated);
        }
    }

    /**
     * Shows and hides the dropdown if you click on the 'Projects'
     * @param {event} event 
     */
    function toggleDropdown(event){
        const content = document.querySelector(`.${style.dropdownContent}`);
        if (content.classList.contains(style.visible)) {
            content.classList.remove(style.visible);
        }
        else {
            content.classList.add(style.visible);
        }
    }

    /**
     * Shows and hides the bottom bar if you click on the 'Projects'
     * @param {event} event 
     */
    function toggleBottomBar(event){
        const hrBottom = document.querySelector(`.${style.hrBottom}`);
        if (hrBottom.classList.contains(style.visible)) {
            hrBottom.classList.remove(style.visible);
        }
        else {
            hrBottom.classList.add(style.visible);
        }
    }

    //Add Project button
    function openModal(){
        let modalView = modal();
        modalView.createProjectForm();
        modalView.addSucessListeners(addProjectSucessListeners);
        document.body.appendChild(modalView.getComponent());
        modalView.focus();
    }

    return {
        getPanel,
        initUser,
        toggle,
        addAddProjectListeners,
        addSignOutListeners,
        createProjectView
    }
})();


