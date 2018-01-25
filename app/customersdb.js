/*
  $(document).ready(function() {
   // executes when HTML-Document is loaded and DOM is ready
   alert("document is ready");

   var activeUser = localStorage.getItem('activeUser');
   db.students
  		 .where("id").equalsIgnoreCase(activeUser)
  		 .each(function(student) {
  				 console.log("Found Student: " + JSON.stringify(student));
  				 $("#loadBtn").html("Student Loaded: " + student.name);
  				 localStorage.setItem('activeUser', student.id);
  				 console.log("You are logged in as: " + student.id);
  				 console.log("Active user is: " + localStorage.getItem('activeUser'));
  				 //	var activeUser = localStorage.getItem('activeUser');
  				 $("#name").html(student.name);
  				 $("#surname").html(student.surname);
  				 $("#instrument").html(student.instrument);
  				 $("#skillLevel").html(student.skillLevel);
  				 $("#exam").html(student.exam);
  				 $("#leadHand").html(student.leadHand);
  				 $("#school").html(student.school);
  				 $("#grade").html(student.grade);
  				 $("#contract").html(student.contract);
  				 $("#gender").html(student.gender);
  				 $("#birthday").html(student.birthday);
  				 $("#drumkit").html(student.drumkit);
  				 $("#practicePad").html(student.practicePad);
  				 $("#metronome").html(student.metronome);
  		 });


  });
*/
/////////////////////////////////////////////////////////

//
//  Create Arrays, get info from localStorage
//
var myCars = [];
var myCarTitles = [];
var savedCarTitles = localStorage.getItem('myCarTitles');
console.log(JSON.stringify("Your saved cars titles are: " + savedCarTitles));
var savedCars = localStorage.getItem('myCars');
console.log("Your saved cars are: " + savedCars);
// myCarTitles = savedCarTitles;
// myCars = savedCars;
/////////////////////////////////////////////////////////

/*
//
//  creates some cars to work with
//
var Fiat5 = {
  id: "Fiat5",
  make: "Fiat",
  model: "500",
  color: "white"
};

var FerrariE = {
  id: "FerrariE",
  make: "Ferrari",
  model: "Enzo",
  color: "red"
};

myCars.push(Fiat5, FerrariE);
myCarTitles.push(Fiat5.id, FerrariE.id);
/////////////////////////////////////////////////////////
*/

//
//  Clicking the dropdown list
//
$("#choose").click( populateDd() );
/////////////////////////////////////////////////////////

//
//  This function populates the dropdown list
//  (currently not deleting and repopulating)
//

function populateDd() {
  var select = document.getElementById("selectCar");
  var options = myCarTitles;
  for(var i = 0; i < options.length; i++) {
      var opt = options[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
  }
};
/////////////////////////////////////////////////////////


//
//  This button buys a new car, saves it and makes it active
//
$("#createBtn").click( function() {
  var x = this.name;
  var carid = $("#"+x).val();
  car = {
    id: carid
  };
    //  car[extraprop] = extrapropval;
    //  myCars.push(car);
    //  myCarTitles.push(car.id);
    localStorage.setItem(carid, JSON.stringify(car));
});
/////////////////////////////////////////////////////////

//
//  This button loads a car and makes it active
//
$("#loadBtn").click( function() {
  var x = this.name;
  var carid = $("#"+x).val();
  var loadedCar = localStorage.getItem(carid);
  var parsedCar = JSON.parse(loadedCar);
  var activeCar = parsedCar.id;
  localStorage.setItem('activeCar', JSON.stringify(parsedCar));
  alert(parsedCar.id + " loaded");
  refreshCar();
  //console.log(parsedCar);
    //  car[extraprop] = extrapropval;
    //  myCars.push(car);
    //  myCarTitles.push(car.id);
});
/////////////////////////////////////////////////////////

//
//  This button updates the features of your car
//
$(".updateBtn").click( function() {
  var prop = this.name;
  var propval = $("#"+prop).val()
  var loadedCar = localStorage.getItem('activeCar');
  var parsedCar = JSON.parse(loadedCar);
  parsedCar[prop] = propval;
  localStorage.setItem('activeCar', JSON.stringify(parsedCar));
  localStorage.setItem(parsedCar.id, JSON.stringify(parsedCar));
  refreshCar();
    //  car[extraprop] = extrapropval;
    //  myCars.push(car);
    //  myCarTitles.push(car.id);
    // localStorage.setItem(carid, JSON.stringify(car));
});
/////////////////////////////////////////////////////////

//
//  This button views your car titles
//
$("#viewCarsBtn").click( function() {
  //myCars.toString(); JSON.stringify(myCars)
  $("#myGarage").html("You have: " + JSON.stringify(myCarTitles));
  // alert(JSON.stringify(myCars));
});
/////////////////////////////////////////////////////////

//
//  This button view garage in detail
//
$("#viewCarsDBtn").click( function() {
  //myCars.toString(); JSON.stringify(myCars)
  $("#myGarageD").html("You have: " + myCars.id);
  // alert(JSON.stringify(myCars));
});
/////////////////////////////////////////////////////////

//
//  This button and function refreshes the car
//

//  Function
function refreshCar() {
  var loadedCar = localStorage.getItem('activeCar');
  var parsedCar = JSON.parse(loadedCar);
  $("#caridDisplay").html(parsedCar.id);
  $("#makeDisplay").html(parsedCar.make);
  $("#modelDisplay").html(parsedCar.model);
  $("#colorDisplay").html(parsedCar.color);
};

// Button
$("#refreshCar").click(function() {
  refreshCar();
});
/////////////////////////////////////////////////////////

//
// Define database
//
var db = new Dexie("MyStudents");
db.version(1).stores({
 students: 'id,name,surname,age'
});

// My New Student Form Start Button //
$("#newStudentForm-startBtn").click( function() {
	var x = this.name;

	$("#"+x).toggleClass("hidden visible");

});


// My Quick-Add (Submit) Button //
$(".quickAdd").click( function() {
	var x = this.name;
	var y = x + "-key";
	var z = x + "-value";
	var key = $("#"+y).val();
	var q = JSON.stringify();
	var value = $("#"+z).val();
	// get user id and store as variable
	var activeUser = localStorage.getItem('activeUser');

	alert("submit button clicked, the user is: " + activeUser);
	alert("submit button clicked, the key is: " + key);
	alert("submit button clicked, the value is: " + value);

/*
		db.students.put({
			key: value
		}).then(
			alert("student updated")
		);
*/

});

// My Test-Edit Button //
$(".editable").dblclick( function() {
	var x = this.id;
	var y = x + "-input";

	$("#"+y).toggleClass("hidden visible");

});

// My End-Edit (Submit) Button //
$(".endedit").click( function() {
	var x = this.name;
	var y = x + "-input";
	var z = x + "-data";
	var data = $("#"+z).val();

	$("#"+y).toggleClass("visible hidden");

	alert("submit button clicked, the value is: " + data);
	alert("x is: " + x);
	alert("y is: " + y);
	alert("z is: " + z);

});

// My Load-Student Button //
$(".loadBtn").click( function() {
	var x = this.name;
	var y = x + "-input";
	var z = x + "-data";
	var data = $("#"+z).val();
	$("#"+z).val(""); //sets the value back to nothing, so I don't have to remove the name first
	$("#"+y).toggleClass("visible hidden");

	db.students
			.where("id").equalsIgnoreCase(data)
			.each(function(student) {
					console.log("Found Student: " + JSON.stringify(student));
					$("#loadBtn").html("Student Loaded: " + student.name);
					localStorage.setItem('activeUser', student.id);
					console.log("You are logged in as: " + student.id);
					console.log("Active user is: " + localStorage.getItem('activeUser'));
					//	var activeUser = localStorage.getItem('activeUser');
					$("#name").html(student.name);
					$("#surname").html(student.surname);
					$("#instrument").html(student.instrument);
					$("#skillLevel").html(student.skillLevel);
					$("#exam").html(student.exam);
					$("#leadHand").html(student.leadHand);
					$("#school").html(student.school);
					$("#grade").html(student.grade);
					$("#contract").html(student.contract);
					$("#gender").html(student.gender);
					$("#birthday").html(student.birthday);
					$("#drumkit").html(student.drumkit);
					$("#practicePad").html(student.practicePad);
					$("#metronome").html(student.metronome);
			}).then(
		);

	alert("Load button clicked, the value is: " + data);

});

// My Add Button //
    $("#submitBtn").click( function() {
        var newUid = $("#newUid").val();
        var newName = $("#newName").val();
        var newSurname = $("#newSurname").val();
        var newInstrument = $("#newInstrument").val();
        var newSkill = $("#newSkill").val();
        var newExam = $("#newExam").val();
        var newHand = $("#newHand").val();
        var newSchool = $("#newSchool").val();
        var newGrade = $("#newGrade").val();
        var newContract = $("#newContract").val();
        var newGender = $("#newGender").val();
        var newDob = $("#newDob").val();
        var newDrumkit = $("#newDrumkit").val();
        var newPracp = $("#newPracp").val();
        var newMetronome = $("#newMetronome").val();
        // add to databse
        db.students.put({
          id: newUid,
          name: newName,
          surname: newSurname,
          instrument: newInstrument,
          skillLevel: newSkill,
          exam: newExam,
          leadHand: newHand,
          school: newSchool,
          grade: newGrade,
          contract: newContract,
          gender: newGender,
          birthday: newDob,
          drumkit: newDrumkit,
          practicePad: newPracp,
          metronome: newMetronome
        }).then(
					$("#newStudentForm").toggleClass("visible hidden"),
          alert("student added")
        );
    });

// My Delete Button //
    $("#deleteBtn").click( function() {
        var newUid = $("#newUid").val();
        // delete from database
        db.students.delete(newUid).then(
          alert("student removed")
        );
    });

//
//  Add items
//

/*
		db.students.add({
		      id: "SimaoL",
		      name: "SimaoLoureiro",
		      age: 10
		    });

		db.students.add({
		      id: "KobusS",
		      name: "Simao",
		      age: 14
		    });
*/

//
//  Update items
//
db.students.put({
  id: "SimaoL",
  name: "Simao",
  age: 33});

db.students.update("KobusS", {name: "Kobus"});

//
// Delete items
//
// db.students.delete(4);

//
//  Query Items
//

    db.students
        .limit(25)
        .toArray()
        .then(function (students) {
            console.log(JSON.stringify(students));
        });

/* //   Query Specific
    db.students
        .where("id").equalsIgnoreCase("StefanN")
        .each(function(student) {
            console.log("Found Student: " + JSON.stringify(student));
            // alert(student.name);
        }).then(
      );
*/

//
//  Retrieve top-X items
//
/*
    db.students
    .orderBy("name")
    .reverse()
    .limit(10)
    .toArray()
    .then(function(students) {
        console.log (
            "My 5 top students: " +
            students.map(function (s) { return s.date }));
    });
*/










$(".t").click( function() {

  var x = this.className;
  alert(x);

});
