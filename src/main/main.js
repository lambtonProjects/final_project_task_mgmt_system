
var taskList=[];
var list = "";
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

(function() {
    'use strict'
    
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
            
            
            id.textContent = taskList[this.id].id;
            name.textContent = taskList[this.id].name;
            from.textContent = taskList[this.id].from;
            to.textContent = taskList[this.id].to;
            completed.textContent = (taskList[this.id].completed)?"Completed":"In Progress";
            description.textContent = taskList[this.id].description;
            owner.textContent = taskList[this.id].owner;
            assigned.textContent = taskList[this.id].assigned;
            rate.textContent = taskList[this.id].rate;
            hours.textContent = (taskList[this.id].completed)?taskList[this.id].hours:"Not Completed Yet";
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
            taskList.push(task);
            console.log(doc.id, " => ", doc.data());
        });
        
       populateList();

    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    
}
class Task {
    
    constructor (id,name, description,completed,responsible,from,to) {
        this.id=id;
        this.name = name;
        this.description = description;
        this.completed = completed;
        this.responsible = responsible;
        this.from = from;
        this.to = to;
    }
    toString(){
        return "id: "+this.id+"name: "+this.name+"description: "+this.description+"completed: "+this.completed+"responsible: "+this.responsible+"from: "+this.from+"to: "+this.to;
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
    return new Task(snapshot.id, data.name, data.description,data.completed,data.responsible,data.from,data.to);
}
function goAddTask(){
    
    window.location.href = '../add_tasks/addtask.html';
  }
// database.getReference("todoList").push().getKey(); how to get key uid
// db.collection("users").doc(doc.id).update({foo: "bar"}); update doc