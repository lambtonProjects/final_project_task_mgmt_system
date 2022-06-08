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
   
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is incorrect!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
    //   // Add this user to Firebase Database
    //   var database_ref = database.ref()
  
    //   // Create User data
    //   var user_data = {
    //     last_login : Date.now()
    //   }
  
    //   // Push to Firebase Database
    //   database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
    //   alert('User Logged In!!')
    window.location.replace("main/main.html");
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }

   // Set up our register function
 function register() {
    // Get all our input fields
    // email = document.getElementById('email').value
    // password = document.getElementById('password').value
    // full_name = document.getElementById('full_name').value
    password="1234567";
    full_name="Alejandro Morales";
    // // Validate input fields
    // if (validate_email(email) == false || validate_password(password) == false) {
    //   alert('Email or Password is Outta Line!!')
    //   return
    //   // Don't continue running the code
    // }
    // if (validate_field(full_name) == false ) {
    //   alert('One or More Extra Fields is Outta Line!!')
    //   return
    // }
    
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      db.collection("users").add({
        Full_Name: full_name,
        email:email,
        admin: false
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
  
      // DOne
      alert('User Created!!')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
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
  function addTask(){
    db.collection("users").add({
        task_Name: "task x",
        responsible:"alejandro",
        status: "started"
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
      console.log("adding task");
  }