function isEmpty(string){
    if(string === ""){
        return true;
    }
    return false;
}

function isResponsibleValid(taskResponsible){
    var invalid = "Assigned to";
    if (taskResponsible == invalid){
        return true;
    }else{
        return false;
    }
}

function isDateValid(taskDate){
    var invalid = "";
    if (taskDate == invalid){
        return true;
    }else{
        return false;
    }
}

// xxxxxxxxxx Email Validation xxxxxxxxxx
function isEmailValid(userEmail){
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(userEmail.match(userEmailFormate)){
        return true;
    }else{
        return false;
    }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function isPasswordValid(userPassword){
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    if(userPassword.match(userPasswordFormate)){
        return true;
    }else{
        return false;
    }    
}

function showErrorMessage(message) {
    return Swal.fire(
        'Error',
        message,
        'error'
      )
}

function showInfoMessage(message) {
    return Swal.fire(
        'Information',
        message,
        'info'
      )
}

function showSuccessMessage(message) {
    return Swal.fire(
        'Success',
        message,
        'success'
      )
}