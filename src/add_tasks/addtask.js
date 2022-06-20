var userList=[];
var ss = JSON.parse(sessionStorage.user);
var form =document.forms["formTask"];
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

getUsersBy();

function addTask(){
    var valueName = document.forms["formTask"]["name"].value;
    var valueDescription = document.forms["formTask"]["description"].value;
    var valueResponsible = document.forms["formTask"]["responsible"].value;
    var valueStartDate = document.forms["formTask"]["startDate"].value;
    var valueEndDate = document.forms["formTask"]["endDate"].value;
    var valueTaskOwner = ss.email;

    if(isEmpty(valueName)){
        showErrorMessage("Please Enter a Name");
        return;
    }else if(isEmpty(valueDescription)){
        showErrorMessage("Please Enter a Description");
        return;
    }else if(isResponsibleValid(valueResponsible)){
        showErrorMessage("Please Enter the responsible assigned to");
        return;
    }else if(isDateValid(valueEndDate)){
        showErrorMessage("Please Enter A Valid Start date");
        return;
    }else if(isDateValid(valueEndDate)){
        showErrorMessage("Please Enter A Valid End date");
        return;
    }else{
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
            showSuccessMessage('Task Created','Your task was created successfully',
            ).then((value) => {
                setTimeout(function(){
                    console.log("Document written with ID: ", docRef.id);
                    document.forms["formTask"]["name"].value='';
                    document.forms["formTask"]["description"].value='';
                    document.forms["formTask"]["responsible"].value='';
                    document.forms["formTask"]["startDate"].value='';
                    document.forms["formTask"]["endDate"].value='';
                    window.location.href="../main/main.html";
                }, 1000)
            });
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
          console.log("adding task");
    }
  }

  function getUsersBy(){
    db.collection("users").where("admin", "==", false)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var user=fromFirestore(doc);
            // doc.data() is never undefined for query doc snapshots
            userList.push(user);
            console.log(doc.id, " => ", doc.data());
        });
        
        populateUserSelect();
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  }

  function populateUserSelect(){
    //list = document.getElementById('task_list');
    console.log("user list lenth = " + userList);
    for (var i = 0; i < userList.length; i++){
        var ls = "";
        ls +=""

        list += ls;
    }

    document.getElementById("task_list").innerHTML = list;
    var tasks = document.getElementsByClassName("task");

    for(var j = 0; j<tasks.length;j++){
        var task = tasks[j];
        task.id = j;
        task.addEventListener("click", function()
        {
            var id = document.getElementById("ID");
            var name = document.getElementById("name");
            var from = document.getElementById("from");
            var to = document.getElementById("to");
            var completed = document.getElementById("completed");
            var description = document.getElementById("description");
            var owner = document.getElementById("owner");
            var assigned = document.getElementById("assigned");
            var rate = document.getElementById("rate");
            var hours = document.getElementById("hours");
            
            
            id.textContent = taskList[this.id].id;
            name.textContent = taskList[this.id].name;
            from.textContent = taskList[this.id].from;
            to.textContent = taskList[this.id].to;
            completed.textContent = (taskList[this.id].completed)?"Completed":"In Progress";
            description.textContent = taskList[this.id].description;
            owner.textContent = taskList[this.id].taskowner;
            assigned.textContent = taskList[this.id].responsible;
            rate.textContent = taskList[this.id].rate;
            hours.textContent = (taskList[this.id].completed)?taskList[this.id].hours:"Not Completed Yet";
            modal.style.display = "block";
        
        })
    }
}


  function fromFirestore (snapshot){
    const data = snapshot.data();
    return new User(data.name, data.email, data.admin);
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