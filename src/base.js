import {config} from './config';
import * as firebase from 'firebase';
import Rebase from 're-base';

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

let userId = null;

const getCourses = new Promise((resolve, reject) => {
    base
        .fetch(`listCourses/`, {context: this})
        .then(data => {
            resolve(data);
        })
        .catch(error => {
        });
});

const getCoursesLessons = (id) => {
    return new Promise((resolve, reject) => {
        base
            .fetch(`courses/${id}/listLessons`, {context: this})
            .then(data => {
                console.log(data);
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    })
};
// Ovo treba da se resi na bolji nacin
let isAuth = false;

const authListener = () => {
    app
        .auth()
        .onAuthStateChanged(user => {
            if (user) {
                userId = user.uid;
                isAuth = true;
            } else {
                isAuth = false;
            }
        })
};

const getIsAuth = () => {
    return isAuth;
};
//---------------------------------------
const getAllUserCourses = () => {
    return new Promise((resolve, reject) => {
        base.fetch(`users/${userId}`, {context: this}).then(user => {
            if (user.courses) {
                resolve(user.courses);
            } else {
                resolve({})
            }
        }).catch(error => reject(error))
    });
};

const getUserCourseById = (courseId) => {
    return new Promise((resolve, reject) => {
        base.fetch(`users/${userId}/courses/${courseId}`, {context: this}).then(course => {
            if (course) {
                resolve(course);
            } else {
                resolve({})
            }
        }).catch(error => reject(error))
    });
};

const addCourseToUser = (courseId, listLessons) => {
    base.post(`users/${userId}/courses/${courseId}`, {
        data: {
            listLessons,
            currentLesson: 0
        }
    });
};

const getLessonById = (lessonId) => {
    return new Promise((resolve, reject) => {
        base.fetch(`lessons/${lessonId}`, {context: this}).then(lesson => {
            if (lesson) {
                resolve(lesson);
            } else {
                resolve({})
            }
        }).catch(error => reject(error))
    });
};

const loadYoutube = () => {
    return new Promise(resolve => {
        base.fetch(`ui/youtube`, {context: this}).then(youtube => {
            if (youtube) {
                resolve(youtube);
            }
        })
    })
};

export {
    base,
    app,
    getCourses,
    getCoursesLessons,
    authListener,
    getIsAuth,
    getAllUserCourses,
    addCourseToUser,
    getUserCourseById,
    getLessonById,
    loadYoutube
}