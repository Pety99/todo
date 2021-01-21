import { initUI } from './firebaseAuth'
import { initFirebase } from './firebase';
import {database} from './firebaseDB';
import { login } from './pages/login';
import { app } from './pages/app';

login.loadPage();
const firebase = initFirebase();
const ui = initUI();


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        login.hidePage();
        app.loadPage(user);
        database.initDB(user);
        database.createUser(user);
        window.database = database;
    } else {
        app.hidePage();
        login.loadPage();
    }
});