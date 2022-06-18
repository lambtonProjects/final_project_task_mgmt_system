class TaskService {
    constructor(db) {
      this.db = db
    }
    getTask(referenceId, success, error) {
        this.db.collection('tasks').doc(referenceId).get().then(function(task){
            var taskData = task.data()
            task.data().assignee.get().then(function(assignee){
                taskData.assigneeObj = assignee.data()
                task.data().owner.get().then(function(owner){
                    taskData.ownerObj = owner.data();
                    success(taskData);
                }).catch(function(err){
                    success(taskData);
                });
            }).catch(function(err){
                success(taskData);
            });
        }).catch(function(err){
            error(err);
        });
    }
  }




//   ------- USAGE  -----------------
//Task model should have references named 'owner'  and 'assignee' fields. Their types should be reference on the db. Returned value will have ownerObj and assigneeObj populated fields for users.  Example task id is: 1E96jWmDKlQMORJbk1Yt
//   var taskService = new TaskService(db);
// taskService.getTask("1E96jWmDKlQMORJbk1Yt", function(task){
//     console.log(task);
// }, function(err){
//     console.log(err);
// })

