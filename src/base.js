import {config} from './config';
import * as firebase from 'firebase';
import Rebase from 're-base';

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

const getCourses = new Promise((resolve, reject) => {
    base
        .fetch(`courses/`, {context: this})
        .then(data => {
            resolve(data);
        });
});

const getCoursesLessons = (id) => {
    return new Promise((resolve, reject) => {
        base
            .fetch(`courses/${id}`, {context: this})
            .then(data => {
                resolve(data);
            })
    })
}

export {base, app, getCourses, getCoursesLessons}