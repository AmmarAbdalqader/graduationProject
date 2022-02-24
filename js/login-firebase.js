
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";

  import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut,sendPasswordResetEmail, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

  // import { getDatabase, ref, set ,child, get} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";
  
  import {  getDatabase, ref, child, get,set } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";



  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration

  const firebaseConfig = {
    apiKey: "AIzaSyATCnwOlFgLLZuV_iMImKsNVc9K6mcmcKM",
    authDomain: "foresight-fea14.firebaseapp.com",
    projectId: "foresight-fea14",
    databseURL: "gs://foresight-fea14.appspot.com/",
    storageBucket: "foresight-fea14.appspot.com",
    messagingSenderId: "1045993012197",
    appId: "1:1045993012197:web:32378d487ddbbc26a38d0c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  

  //  const storage = getStorage(firebaseApp);
  
  //  const storageRef = ref(storage);


const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase();
const providerFace = new FacebookAuthProvider();


    var name =  document.getElementById('inputName').value;
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;

// ************Create New User ********************

async function userCreate()  {

    var name =  document.getElementById('inputName').value;
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;

   await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("Working!");
            writeUserData(user);
            location.href = "/index.html";

            // ...
        })
        .catch((error) => {
            console.log("Error");

            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        }); 
        
        
}
// var aname = document.getElementById('inputName').value;

async function writeUserData(user,name) {
    const db = getDatabase();
    
    await set(ref(db, 'users/' + user.uid), {
        name :  document.getElementById('inputName').value,
        email:document.getElementById('inputEmail').value,
        password:document.getElementById('inputPassword').value
        
    });
  }
document.getElementById('create-newuser-button').addEventListener('click', userCreate, false);

 document.getElementById('create-newuser-button').addEventListener('click', writeUserData, false);




// ************** Sign in existed Account *****************
async function userSign() {
  
    var email = document.getElementById('signEmail').value;
    var password = document.getElementById('signPassword').value;

    // if(detect==false){
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            console.log("Signed in");

           
             location.href = "/index.html";
         

            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            console.log("Error");
            const errorCode = error.code;
            const errorMessage = error.message;
        });
        
        
    }
   
 document.getElementById('sign-in-button').addEventListener('click', userSign, false);


// Tracker When the user is signed in or not
function test(){
  console.log( auth.currentUser.uid);
// onAuthStateChanged(auth, user => {
//     if (user) {
//         console.log("User In");
//         var email = user.email;
//         var currentUser=user;
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         const uid = user.uid;
//         // ...
//     } else {
//         console.log("User Out");

//         // User is signed out
//         // ...
//     }
// })
}
// document.getElementById('test').addEventListener('click', test, false);






// // **************Sign in with Google **************
function userGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            location.href = "/index.html";


            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}


document.getElementById('google-login-button').addEventListener('click', userGoogle, false);
document.getElementById('google-login-button1').addEventListener('click', userGoogle, false);



// *********** SignOut ****************
function userOut(){
console.log("Potato");
  

    signOut(auth).then(() => {
        console.log("Signed out Successfully");
        // location.href = "/login.html";

        // Sign-out successful.
      }).catch((error) => {
        console.log("Error Signing out");

        // An error happened.
      });
     
      
       
}
document.getElementById('sign-out-button').addEventListener('click', userOut, false);

// // ************* Reset Password ********************
function reset(){
    var email = document.getElementById('basic-url').value;
    sendPasswordResetEmail(auth, email)
  .then(() => {
    alert("Reset Password Sent!");
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}
document.getElementById('reset-button').addEventListener('click', reset, false);

// ********************** Login with Facebook *****************


function userFacebook() {

    const auth = getAuth();
signInWithPopup(auth, providerFace)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;
    location.href = "/index.html";
    console.log("Facebook Work");

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    console.log("Error");

    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });

}

document.getElementById('loginFace').addEventListener('click', userFacebook, false);
document.getElementById('loginFace1').addEventListener('click', userFacebook, false);

// **************************








function fetch(){
  const dbRef = ref(getDatabase());

get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
}

 document.getElementById('test').addEventListener('click', fetch, false);



 