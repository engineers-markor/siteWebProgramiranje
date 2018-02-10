import {config} from './config';
import * as firebase from 'firebase';
import Rebase from 're-base';

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

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
            .fetch(`courses/${id}/lessons`, {context: this})
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    })
};

const getUserCourses = (userUid) => {
    return new Promise((resolve, reject) => {
        base.fetch(`users/${userUid}`, {context: this}).then(user => {
            if (user.courses) {
                resolve(user.courses);
            } else {
                resolve({})
            }
        }).catch(error => reject(error))
    });
};

const userListener = () => {
    return new Promise(resolve => {
        app
            .auth()
            .onAuthStateChanged(user => {
                if (user) {
                    base
                        .fetch(`users/${user.uid}`, {context: this})
                        .then(data => {
                            resolve({
                                user: {
                                    uid: user.uid,
                                    username: data.username,
                                    photoUrl: data.photoUrl,
                                    email: data.email,
                                    courses: data.courses,
                                }
                            });
                        })
                        .catch(error => {
                        });
                } else {
                    resolve({});
                }
            });
    })
};

const addCourseToUser = (userUid, courseId) => {
    return new Promise((resolve, reject) => {
        base
            .fetch(`courses/${courseId}/listLessons`, {context: this})
            .then(listLessons => {
                console.log(listLessons);
                base.post(`users/${userUid}/courses/${courseId}`, {
                    data: {
                        listLessons,
                        currentLesson: 0
                    }
                })
            })
            .catch(error => {
                reject(error);
            });
    })
};

const startCourse = (courseId) => {
    return new Promise((resolve, reject) => {
        base
            .fetch(`courses/${courseId}/listLessons`, {context: this})
            .then(listLessons => {
                console.log(listLessons);
                base.put(`users/${app.auth().currentUser.uid}/courses/${courseId}`, {
                    listLessons
                })
            })
            .catch(error => {
                reject(error);
            });


    })
};

export {base, app, getCourses, getCoursesLessons, startCourse, getUserCourses, addCourseToUser, userListener}