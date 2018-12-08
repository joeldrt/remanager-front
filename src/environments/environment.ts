// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // API_URL: 'http://localhost:8080/',
  // API_URL: 'https://remanager.devdigiall.tk/',
  API_URL: 'http://localhost:5000/',
  firebase: {
    apiKey: 'AIzaSyAiPiStmJkUxpWUi4p4NqaSW4NJv8CEGxA',
    authDomain: 'remanager-a553d.firebaseapp.com',
    databaseURL: 'https://remanager-a553d.firebaseio.com',
    projectId: 'remanager-a553d',
    storageBucket: 'remanager-a553d.appspot.com',
    messagingSenderId: '413882937754'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
