import firebase from "firebase/app";
import "firebase/database";

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
        updates[`/project-names/${uid}/${id}`] = { name: project.name };

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
        updates[`/projects/${uid}/${todo.projectID}/${newTodoKey}`] = { name: todo.name, dueDate: todo.dueDate, priority: todo.priority };

        db.ref().update(updates);

        return newTodoKey;
    }

    function updateTodo(id, todo) {
        //Get the current project ID of the todo, so it can be deleted from the project too
        db.ref(`/todos/${uid}/${id}`).once('value').then((snapshot) => {
            console.log(snapshot.val());
            const currentProjectID = snapshot.val().projectID;

            const updates = {};
            updates[`/todos/${uid}/${id}`] = todo;
            updates[`/projects/${uid}/${currentProjectID}/${id}`] = null;
            updates[`/projects/${uid}/${todo.projectID}/${id}`] = { name: todo.name, dueDate: todo.dueDate, priority: todo.priority };
            db.ref().update(updates);
        });
    }

    function deleteTodo(id) {
        //Get the current project ID of the todo, so it can be deleted from the project too
        db.ref(`/todos/${uid}/${id}`).once('value').then((snapshot) => {
            console.log(snapshot.val());
            const currentProjectID = snapshot.val().projectID;

            //Delete the current project
            const updates = {};
            updates[`/todos/${uid}/${id}`] = null;
            updates[`/projects/${uid}/${currentProjectID}/${id}`] = null;
            db.ref().update(updates);
        });
    }

    return {
        initDB,
        createUser,
        createProject,
        updateProject,
        deleteProject,
        createTodo,
        updateTodo,
        deleteTodo,
    }
})();

