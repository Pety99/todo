import firebase from 'firebase/app';
import 'firebase/database';
import { todo } from './components/todo/todo';

export const database = (function () {

    let db;
    let uid;

    function initDB(user) {
        db = firebase.database();
        uid = user.uid;
    }

    function createUser(user) {
        db.ref('users/' + user.uid).set({
            username: user.displayName,
            email: user.email,
            profile_picture: user.photoURL
        });
    }

    function createProject(project) {
        // Get a key for a new Project.
        const newProjectKey = db.ref().child('projects').push().key;

        // Write the new projects's data simultaneously in the projects list and the project-names list.
        const updates = {};
        updates[`/projects/${uid}/${newProjectKey}`] = project;
        updates[`/project-names/${uid}/${newProjectKey}`] = { name: project.name };

        db.ref().update(updates);

        return newProjectKey;
    }

    function updateProject(id, project) {
        const updates = {};
        updates[`/projects/${uid}/${id}`] = project;
        updates[`/project-names/${uid}/${id}`] = { name: project.name};

        db.ref().update(updates);
    }

    function deleteProject(id) {
        const updates = {};
        updates[`/projects/${uid}/${id}`] = null;
        updates[`/project-names/${uid}/${id}`] = null;
        db.ref().update(updates);
    }

    function createTodo(todo) {
        // Get a key for a new Todo.
        const newTodoKey = db.ref().child(`todos/`).push().key;

        const updates = {};
        updates[`/todos/${uid}/${newTodoKey}`] = todo;
        updates[`/projects/${uid}/${todo.projectID}/${newTodoKey}`] = { name: todo.name, dueDate: todo.dueDate, priority: todo.priority, completed: (todo.completed || false)};

        db.ref().update(updates);

        return newTodoKey;
    }

    function updateTodo(id, todo) {
        //Get the current project ID of the todo, so it can be deleted from the project too
        db.ref(`/todos/${uid}/${id}`).once('value').then((snapshot) => {
            const currentProjectID = snapshot.val().projectID;

            const updates = {};
            updates[`/todos/${uid}/${id}`] = todo;
            updates[`/projects/${uid}/${currentProjectID}/${id}`] = null;
            updates[`/projects/${uid}/${todo.projectID}/${id}`] = { name: todo.name, dueDate: todo.dueDate, priority: todo.priority, completed: (todo.completed || false) };
            db.ref().update(updates);
        });
    }

    function deleteTodo(id) {
        //Get the current project ID of the todo, so it can be deleted from the project too
        db.ref(`/todos/${uid}/${id}`).once('value').then((snapshot) => {
            const currentProjectID = snapshot.val().projectID;

            //Delete the current project
            const updates = {};
            updates[`/todos/${uid}/${id}`] = null;
            updates[`/projects/${uid}/${currentProjectID}/${id}`] = null;
            db.ref().update(updates);
        });
    }

    /**
     * Deletes the todos after the project is deleted
     * @param {*} deletedProject 
     */
    function deleteTodos(deletedProject){
        db.ref(`/todos/${uid}`).once('value').then((snapshot) => {
            const allTodos = snapshot.val();
            Object.entries(allTodos).forEach( ([id, todo]) => {
                if(todo.projectID === deletedProject.key){
                    deleteTodo(id);
                }
            });
            //Delete the current project
            /*const updates = {};
            updates[`/todos/${uid}/${id}`] = null;
            updates[`/projects/${uid}/${currentProjectID}/${id}`] = null;
            db.ref().update(updates);*/
        });
    }


    function toggleTodo(id) {
        db.ref(`/todos/${uid}/${id}`).once('value').then((snapshot) => {
            const currentTodo = snapshot.val();
            if(currentTodo.completed == undefined || currentTodo.completed == false) {
                currentTodo.completed = true;
            }
            else{
                currentTodo.completed = false;
            }
            console.log(currentTodo);
            const updates = {};
            updates[`/projects/${uid}/${currentTodo.projectID}/${id}`] = currentTodo;
            updates[`/todos/${uid}/${id}`] = currentTodo;
            db.ref().update(updates);
        });
    }


    // Database events

    function projectCreated(listeners) {
        // The set timeout is needed so that this function is only called when the db is initialized
        setTimeout(function () {
            const projectsRef = db.ref(`/projects/${uid}/`);
            projectsRef.on('child_added', (snapshot, prevChildKey) => {
                const newProject = snapshot;
                listeners.forEach(listener => {
                    listener(newProject);
                })
            });
        }, 0);
    }

    function projectCreatedOnlyName(listeners) {
        // The set timeout is needed so that this function is only called when the db is initialized
        setTimeout(function () {
            const projectsRef = db.ref(`/project-names/${uid}/`);
            projectsRef.on('child_added', (snapshot, prevChildKey) => {
                const newProject = snapshot;
                listeners.forEach(listener => {
                    listener(newProject);
                })
            });
        }, 0);
    }

    function projectDeleted(listeners) {
        setTimeout(function () {
            const projectsRef = db.ref(`/project-names/${uid}/`);
            projectsRef.on('child_removed', (snapshot, prevChildKey) => {
                const deletedProject = snapshot;
                console.log(deletedProject.val());
                console.log(deletedProject.key);



                listeners.forEach(listener => {
                    listener(deletedProject);
                })
            });
        }, 0);
    }

    function todoCreated(projectID, listeners) {
        // The set timeout is needed so that this function is only called when the db is initialized
        setTimeout(function () {
            const projectRef = db.ref(`/projects/${uid}/${projectID}`);
            projectRef.off('child_added');
            projectRef.on('child_added', (snapshot, prevChildKey) => {
                const newTodo = snapshot;
                listeners.forEach(listener => {
                    listener(newTodo);
                });
            });
        }, 0);
    }

    function todoDeleted(projectID){

    }

    return {
        initDB,
        createUser,
        createProject,
        updateProject,
        deleteProject,
        createTodo,
        updateTodo,
        toggleTodo,
        deleteTodo,
        deleteTodos,
        projectCreated,
        projectCreatedOnlyName,
        projectDeleted,
        todoCreated,
    }
})();

