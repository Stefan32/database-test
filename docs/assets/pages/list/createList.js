var studentList = JSON.parse(localStorage.getItem("studentList"));

function findStudents(studentArray) {

  for (var i = 0; i < studentArray.length; i++) {
    var tempStud = loadStoredStudent(studentArray[i]);
    // var tempSection = tempObj['section'];
    // var tempTitle = tempObj['title'];
    // var codeArray = calculateCodes(tempObj['code'], tempObj['minTempo'], tempObj['maxTempo']);
    var tempFullName = tempStud['name'] + " " + tempStud['surname'];
    var tempId = tempStud['id'];
    createListItem(tempFullName, tempId);
     function createListItem(fullName, studListId) {

      // create elements
      var listItem = document.createElement("li");

        var nameH3 = document.createElement("h3");
        var userIdP = document.createElement("p");
        var deleteButton = document.createElement("button");

          var nameNode = document.createTextNode(fullName);
          var idNode = document.createTextNode(studListId);
          var deleteNode = document.createTextNode("Delete");

      // set id's and classes
      nameH3.setAttribute("class", "name");
      userIdP.setAttribute("class", "userid");
      deleteButton.setAttribute("id", studListId);
      deleteButton.setAttribute("class", "deleteStudentBtn");

      // Putting elements inside each other
      // tempoP.appendChild(tempoNode);
      // tempoDiv.appendChild(tempoP);
      userIdP.appendChild(idNode);
      nameH3.appendChild(nameNode);
      deleteButton.appendChild(deleteNode);

        listItem.appendChild(nameH3);
        listItem.appendChild(userIdP);
        listItem.appendChild(deleteButton);

      // adding to html
      var element = document.getElementById("list");
      element.appendChild(listItem);

    }; // end function createListItem

  }; // end for (var i = 0; i < studentArray.length; i++)
}; // end function findStudents(studentArray)

findStudents(studentList);

// localStorage.removeItem(key);

//////////////////////////////////////////////////////////////////////////////
// INITIALIZE LIST
//////////////////////////////////////////////////////////////////////////////

var options = {
  valueNames: [ 'name', 'userid' ]
};

var userList = new List('students', options);


//
//  This monitors when a Delete Student Button is clicked and performs the function
//
$(".deleteStudentBtn").click(function() {
  deleteStudent(this.id);
});
//////////////////////////////////////////////////////////////////////////////

function deleteStudent(id) {
  var deleteSure = prompt('Are you sure you want to delete the student? y/n');

  if (deleteSure === "y") {
    var iToDelete = studentList.indexOf(id);
    studentList.splice(iToDelete, 1);
    localStorage.setItem("studentList", JSON.stringify(studentList));
    localStorage.removeItem(id);
    localStorage.removeItem("activeUser");
    window.location.reload();
  }
};
