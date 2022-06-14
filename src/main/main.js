(function() {
    'use strict'

    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var taskList = [{id: "001", name: "bla", description: "bla-bla", completed: true, from: "01/01/2022", to: "05/07/2022"}, 
    {id: "002", name: "bla2", description: "bla-bla", completed: false, from: "01/01/2022", to: "05/07/2022"}, {id: "003", name: "bla3", description: "bla-bla", completed: true, from: "01/01/2022", to: "05/07/2022"}, 
    {id: "004", name: "bla4", description: "bla-bla", completed: true, from: "01/01/2022", to: "05/07/2022"}, {id: "005",name: "bla3", description: "bla-bla", completed: false, from: "01/01/2022", to: "05/07/2022"}, 
    {id: "006", name: "bla4", description: "bla-bla", completed: false, from: "01/01/2022", to: "05/07/2022"}];

    var list = "";

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
                console.log(this.id);
                
                id.textContent = taskList[this.id].id;
                name.textContent = taskList[this.id].name;
                from.textContent = taskList[this.id].from;
                to.textContent = taskList[this.id].to;
                completed.textContent = taskList[this.id].completed;
                description.textContent = taskList[this.id].description;
            modal.style.display = "block";
            
            })
        }
    }
         

 populateList();

}())