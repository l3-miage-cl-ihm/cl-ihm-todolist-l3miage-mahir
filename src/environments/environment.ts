// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


import 'firebase/auth';
import 'firebase/firestore';
export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyDsxb0nCFcClrNAsGyOlyyYHDNJ7uVpnwU",
    authDomain: "todolistapp-39f3b.firebaseapp.com",
    projectId: "todolistapp-39f3b",
    storageBucket: "todolistapp-39f3b.appspot.com",
    messagingSenderId: "988584817237",
    appId: "1:988584817237:web:6319e3c99237c0f6af1adc",
    measurementId: "G-YW2VQ33XJ3"
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
