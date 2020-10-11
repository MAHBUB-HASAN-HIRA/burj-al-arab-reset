import * as firebase from "firebase/app";
import firebaseConfig from '../../firebase.config'
import "firebase/auth";

export const firebaseInitialize = () =>{
   if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
   } 

export const signInWithGoogle = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider).then(function(result) {
        var {displayName, email, photoURL} = result.user;
        const userSignedIn = {
            name : displayName,
            email: email,
            photo: photoURL,
            isSignIn: true,
            success: true,
        }
        handleVerifyToken();
        return userSignedIn;
      }).catch(error => console.log(error));
}

export const signOut = () => {
    return firebase.auth().signOut()
    .then(res => {
        const userSignedOut = {
            isSignIn: false,
            name:'',
            email:'',
            photo:'',
            error:'',
            success: false,
        }
        return userSignedOut;
      })
      .catch( error =>{
        console.log(error);
      });
}
export  const handleVerifyToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(idToken => {
               sessionStorage.setItem("idToken" , idToken);
               console.log(idToken);
            }).catch(function(error) {
                // Handle error
            });
}