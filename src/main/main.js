
var taskList=[];
var list = "";
var modal = document.getElementById("myModal");
var wellcome = document.getElementById("wellcome");
var span = document.getElementsByClassName("close")[0];
var ss = JSON.parse(sessionStorage.user);
var currentTask = null;

(function() {
    'use strict'
    wellcome.textContent = "Wellcome, " + ss.name

    if(!ss.admin) {
        document.getElementById('adminButtons').style.display="none";
    }

    getTasks();
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }
 

}())

function populateList(){
    //list = document.getElementById('task_list');
    console.log("task list lenth = " + taskList);
    for (var i = 0; i < taskList.length; i++){
        var ls = "";
        var currImage = (taskList[i].completed == true)?"done.png":"inprogress.png";
        ls += "<div class=\"task\"><h5 class=\"task-id\">" + taskList[i].id + "</h5><p class=\"task-name\">" + taskList[i].name + "</p><a href=\"#\" class=\"btn btn-primary\">See all details</a><img class=\"image\" id=\"img\" src=" + currImage + "></div>";
        
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
            var total = document.getElementById("total");
            var completeTaskBtn = document.getElementById("completeTask");
            currentTask = taskList[this.id];
            
            id.textContent = taskList[this.id].id;
            name.textContent = taskList[this.id].name;
            from.textContent = taskList[this.id].from;
            to.textContent = taskList[this.id].to;
            completed.textContent = (taskList[this.id].completed)?"Completed":"In Progress";
            description.textContent = taskList[this.id].description;
            owner.textContent = taskList[this.id].taskowner;
            assigned.textContent = taskList[this.id].responsible;
            rate.textContent = taskList[this.id].costperhours;
            hours.textContent = (taskList[this.id].completed)?taskList[this.id].hoursofwork:"Task Not Completed Yet";
            total.textContent = (taskList[this.id].completed)?taskList[this.id].hoursofwork * taskList[this.id].costperhours:"Task Not Completed Yet";
            if(taskList[this.id].completed){
                completeTaskBtn.style.display = "none";
            }else{
                completeTaskBtn.style.display = "block";
            }

            if(ss.admin){
                completeTaskBtn.style.display = "none";
            }

            completeTaskBtn.addEventListener("click", function(){
                let workingHours = prompt("How many hours you worked on this task?", "0");

                if (workingHours != null) {
                    db.collection("tasks").doc(currentTask.id).update({completed: true});
                    db.collection("tasks").doc(currentTask.id).update({"hoursofwork": workingHours});
                    completed.textContent = "Completed";
                    total.textContent = workingHours * currentTask.costperhours; //Fixed(2)
                    hours.textContent = workingHours;
                    modal.style.display = "none";
                    taskList = [];
                    list = "";
                    getTasks(); //refresh the screen

                }
            });
            modal.style.display = "block";
        
        })
    }
}
function getTasks(){
    db.collection("tasks")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            var task=fromFirestore(doc);
            if(ss.admin){
                if(task.taskowner == ss.email){
                    taskList.push(task);
                }
                    
            }else {
                if(task.responsible == ss.email){
                    taskList.push(task);
                }
            }
            // taskList.push(task);
            console.log(doc.id, " => ", doc.data());
        });
        
       populateList();

    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    
}
class Task {
    
    constructor (id,name, description,completed,responsible,taskowner,from,to, hoursofwork, costperhours) {
        this.id=id;
        this.name = name;
        this.description = description;
        this.completed = completed;
        this.responsible = responsible;
        this.taskowner = taskowner;
        this.from = from;
        this.to = to;
        this.hoursofwork = hoursofwork;
        this.costperhours = costperhours;


    }
    toString(){
        return "id: "+this.id+"name: "+this.name+"description: "+this.description+"completed: "+this.completed+"responsible: "+this.responsible+"task owner: "+this.taskowner+"from: "+this.from+"to: "+this.to + "hours: " + this.hoursofwork + "rate: " + this.costperhours;
    }
}
function toFirestore (task) {
    return {
        name: task.name,
        state: task.state,
        country: task.country
        };
}
function fromFirestore (snapshot){
    const data = snapshot.data();
    return new Task(snapshot.id, data.name, data.description,data.completed,data.responsible,data.taskowner,data.from,data.to,data.hoursofwork,data.costperhours);
}
function goAddTask(){
    window.location.href = '../add_tasks/addtask.html';
  }
function goToAddUser() {
    window.location.href = '../add_user/adduser.html';
}

function logout(){
    sessionStorage.clear();
    window.location.replace("../index.html");
}

function checkUser() {
    if(sessionStorage.getItem('user') == null){
      window.location.replace("../index.html")
    }
}
// database.getReference("todoList").push().getKey(); how to get key uid
// db.collection("users").doc(doc.id).update({foo: "bar"}); update doc