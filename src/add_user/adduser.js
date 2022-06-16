var form =document.forms["formUser"];
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

  function signUp(){

    var strName = form["name"].value;
    var strSurname = form["surname"].value;
    var strEmail = form["email"].value;
    var strPassword = form["password"].value;
    

    if(isEmpty(strName)){
        showErrorMessage("Please Enter a Name.");
        return;
    }else if(isEmpty(strSurname)){
        showErrorMessage("Please Enter a Surname.");
        return;
    }else if(!isEmailValid(strEmail)){
        showErrorMessage("Please Enter A Valid Email Address.");
        return;
    }else if(isPasswordValid(strPassword) == null){
        showErrorMessage("Please Enter A Valid Password.");
        return;
    }else{
        firebase.auth().createUserWithEmailAndPassword(strEmail, strPassword).then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }

            var userData = {
                name: strName,
                surname: strSurname,
                email: strEmail,
                password: strPassword,
                admin:false
            }

            db.collection("users")
            .add(userData)
            .then((docRef) => 
            {
                showSuccessMessage('Your Account Created','Your account was created successfully, you can log in now.',
                ).then((value) => {
                    setTimeout(function(){
                        window.location.replace("../index.html");
                    }, 1000)
                });
            })
            .catch((error) => {
                showErrorMessage(error.message);
            });
            
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            showErrorMessage(errorMessage);
        });
    }
}

  function cancel(){    
    //window.location.href="../main/main.html";

    // const snapshot = db.collection('tasks').get().then(function(values){
    //     values.forEach((doc) => {
    //         console.log(doc.id, '=>', doc.data().test.get());
    //         doc.data().test.get().then(function(value){
    //             console.log(value.data())
    //         })
    //       });
    // });

    window.location.href = '../main/main.html';


  }

