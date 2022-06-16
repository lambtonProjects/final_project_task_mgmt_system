function addTask(){
    var valueName = document.forms["formTask"]["name"].value;
    var valueDescription = document.forms["formTask"]["description"].value;
    var valueResponsible = document.forms["formTask"]["responsible"].value;
    var valueStartDate = document.forms["formTask"]["startDate"].value;
    var valueEndDate = document.forms["formTask"]["endDate"].value;

    db.collection("tasks").add({
        name: valueName,
        responsible: valueResponsible,
        description: valueDescription,
        completed: false,
        from: valueStartDate,
        to: valueEndDate
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
      console.log("adding task");
  }

  function cancel(){    
    window.location.replace("../main/main.html");
  }