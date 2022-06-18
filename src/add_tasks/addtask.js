var form =document.forms["formTask"];
var ss = JSON.parse(sessionStorage.user);
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

function addTask(){
    var valueName = document.forms["formTask"]["name"].value;
    var valueDescription = document.forms["formTask"]["description"].value;
    var valueResponsible = document.forms["formTask"]["responsible"].value;
    var valueStartDate = document.forms["formTask"]["startDate"].value;
    var valueEndDate = document.forms["formTask"]["endDate"].value;
    var valueTaskOwner = ss.email;
    
    db.collection("tasks").add({
        name: valueName,
        responsible: valueResponsible,
        description: valueDescription,
        completed: false,
        taskowner: valueTaskOwner,
        from: valueStartDate,
        to: valueEndDate
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
         document.forms["formTask"]["name"].value='';
    document.forms["formTask"]["description"].value='';
    document.forms["formTask"]["responsible"].value='';
    document.forms["formTask"]["startDate"].value='';
    document.forms["formTask"]["endDate"].value='';
    window.location.href="../main/main.html";
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
      console.log("adding task");
  }

  function cancel(){    
    window.location.href="../main/main.html";
  }

  function checkUser() {
    if(sessionStorage.getItem('user') == null){
      window.location.replace("../index.html")
    }else if (!ss.admin){
        window.location.href="../main/main.html";
    }
}