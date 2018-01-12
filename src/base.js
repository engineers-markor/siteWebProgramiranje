import {config} from './config';
import * as firebase from 'firebase';
import Rebase from 're-base';

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());
// const facebookProvider = new firebase.auth.FacebookAuthProvider();

export {base, app}