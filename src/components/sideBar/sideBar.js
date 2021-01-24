import profilePicture from './assets/Profile.svg'
import today from './assets/Today.svg'
import projects from './assets/Projects.svg'
import arrow from './assets/Arrow.svg'
import dot from './assets/Dot.svg'

import style from './sideBar.module.css'

import {button} from '/src/components/button/button'

export const sideBar = (function () {


    let sidePanel;
    let container;
    let profileContainer;
    let dayView;
    let dropdown;
    let addButton = button();

    const initPanel = (function () {
        createPanel();
        profileContainer = createProfile();
        dayView = createDayView();
        dropdown = createDropdown([turnArrow, toggleDropdown, toggleBottomBar]);
        addButton.create('Add Project');

        container.appendChild(profileContainer);
        container.appendChild(dayView);
        container.appendChild(dropdown);
        container.appendChild(addButton.getButton());
    })();

    function getPanel() {
        return sidePanel;
    }

    function toggle() {
        
        addButton.toggle();

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

    function createPanel() {
        sidePanel = document.createElement('div');
        sidePanel.classList.add(style.sidePanel);
        container = document.createElement('div');
        container.classList.add(style.container);
        sidePanel.appendChild(container);
    }

    function createProfile() {
        const profileContainer = document.createElement('div');
        profileContainer.classList.add(style.profileContainer);
        profileContainer.innerHTML =
            `<img id="profile-picture" src="${profilePicture}" alt="Profile Picture">
        <p id="welcome-message">Welcome Back</p>`;
        return profileContainer;
    }

    function createDayView() {
        const dayViewContainer = document.createElement('div');
        dayViewContainer.classList.add(style.dayViewContainer);
        dayViewContainer.appendChild(createDay('Today', today));
        return dayViewContainer;
    }

    function createDay(name, svg, listeners) {
        const day = document.createElement('div');
        day.classList.add(style.day);
        day.innerHTML = `<img src="${svg}" alt="${name}"><p>${name}</p>`;

        listeners && listeners.forEach(listener => {
            day.addEventListener('click', listener);
        });

        return day;
    }

    function createDropdown(listeners) {
        const dropdown = document.createElement('div');
        dropdown.classList.add(style.dropdown);
        const project = createDay('Projects', projects, listeners);
        const img = document.createElement('img');
        img.src = arrow;
        img.alt = "Arrow";
        img.classList.add(style.arrow);
        project.appendChild(img);
        dropdown.appendChild(project);
        const hr1 = document.createElement('hr');
        hr1.classList.add(style.hrTop);
        dropdown.appendChild(hr1);
        const content = document.createElement('div');
        content.classList.add(style.dropdownContent);
        /****************************************************************/
        content.appendChild(createProject('Work 1'));
        content.appendChild(createProject('Work 2'));
        content.appendChild(createProject('Work 3'));
        content.appendChild(createProject('Work 3'));
        content.appendChild(createProject('Work 3'));
        content.appendChild(createProject('Work 3'));
        content.appendChild(createProject('Work 3'));
        content.appendChild(createProject('Work 3'));
        content.appendChild(createProject('Work 3'));
        content.appendChild(createProject('Work 3'));
        content.appendChild(createProject('Work 3'));
        content.appendChild(createProject('Work 3'));
        /****************************************************************/
        dropdown.appendChild(content);
        const hr2 = document.createElement('hr');
        hr2.classList.add(style.hrBottom);
        dropdown.appendChild(hr2);

       /* listeners && listeners.forEach(listener => {
            dropdown.addEventListener('click', listener);
        });*/

        return dropdown;
    }

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

    //Event Listeners

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

    function toggleDropdown(event){
        const content = document.querySelector(`.${style.dropdownContent}`);
        if (content.classList.contains(style.visible)) {
            content.classList.remove(style.visible);
        }
        else {
            content.classList.add(style.visible);
        }
    }

    function toggleBottomBar(event){
        const hrBottom = document.querySelector(`.${style.hrBottom}`);
        if (hrBottom.classList.contains(style.visible)) {
            hrBottom.classList.remove(style.visible);
        }
        else {
            hrBottom.classList.add(style.visible);
        }
    }


    return {
        getPanel,
        toggle,
    }
})();


