// //  Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBswUAtEYm7rp_66YJ_LXN2ns-xjgu9wJc",
  authDomain: "jsmanagment-15f9e.firebaseapp.com",
  projectId: "jsmanagment-15f9e",
  storageBucket: "jsmanagment-15f9e.appspot.com",
  messagingSenderId: "290004854452",
  appId: "1:290004854452:web:a57fa3359e0c48878119e1",
  measurementId: "G-3V7Y7J1QEC"
};

// Initialize Firebase
  const app=firebase.initializeApp(firebaseConfig);
// Initialize variables
  const auth = firebase.auth()
  const db = firebase.firestore()
   
  function getApp(){
    return app;
  }
   function getAuth(){
    return auth;
  }
   function getDB(){
    return db;
  }
  // Set up our login function
  function login(){
    // Get all our input fields
    buttonElem = document.getElementById('login')
    spanElem = document.getElementById('spinner')
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    buttonElem.disabled = true;
    spanElem.classList.add('spinner-border')

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is incorrect!')
      buttonElem.disabled = false;
      spanElem.classList.remove('spinner-border')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password).then(function() {
      var user = auth.currentUser
      db.collection("users").doc(user.uid).withConverter(userConverter).get().then((doc) => {
        if (doc.exists) {
          var user = doc.data()
            console.log("Document data:", user.toString)
            sessionStorage.setItem('user', JSON.stringify(user))
            window.location.replace("main/main.html")
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            buttonElem.disabled = false;
            spanElem.classList.remove('spinner-border')
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
        buttonElem.disabled = false;
        spanElem.classList.remove('spinner-border')
      });
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
      alert(error_message)
      buttonElem.disabled = false;
      spanElem.classList.remove('spinner-border')
    })
  }

  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }

class User {
  constructor (name, email, admin ) {
      this.name = name;
      this.email = email;
      this.admin = admin;
  }
  toString() {
      return this.name + ', ' + this.email + ', ' + this.admin;
  }
}

// Firestore data converter
var userConverter = {
    toFirestore: function(user) {
        return {
            name: user.name,
            email: user.email,
            admin: user.admin
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new User(data.name, data.email, data.admin);
    }
};

function checkSession() {
  if(sessionStorage.getItem('user') != null){
    window.location.replace("/main/main.html")
  }
}