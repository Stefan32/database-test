//
//  This happens on document load
//
$(document).ready(function() {
  refreshStudent();
  refreshTempo();
  refreshProgress();
  createMetronomeSounds();
  createSong();
  displayLessons();

  //
  //  This monitors when a copy button is clicked and performs the function
  //
  $(".copyBtn").click(function() {
    var btnName = $(this).attr('name');
    var copyId = "copyBtn" + btnName;
    var toCopy = $("#"+copyId).html();
    copyToClipboard(toCopy);

      function copyToClipboard(val){
          var dummy = document.createElement("input");
          document.body.appendChild(dummy);
          dummy.setAttribute("id", "dummy_id");
          document.getElementById("dummy_id").value=val;
          dummy.select(val);
          document.execCommand("copy");
          document.body.removeChild(dummy);
        };
  });
  //////////////////////////////////////////////////////////////////////////////

});
//////////////////////////////////////////////////////////////////////////////




//
//  function for setting the timer
//

$(".timer").click(function() {
  var timeInMinutes = 5;
  var currentTime = Date.parse(new Date());
  var deadline = new Date(currentTime + timeInMinutes*60*1000);

  function getTimeRemaining(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  // getTimeRemaining(deadline).minutes

  function initializeClock(id, endtime){
    var clock = document.getElementById(id);
    var timeinterval = setInterval(function(){
      var t = getTimeRemaining(endtime);
      clock.innerHTML = // 'days: ' + t.days + '<br>' +
                        // 'hours: '+ t.hours + '<br>' +
                        'Minutes: ' + t.minutes + " " +
                        'Seconds: ' + t.seconds;
      if(t.total<=0){
        clearInterval(timeinterval);
      }
    },1000);
  }

  initializeClock('clockdiv', deadline);
});

//////////////////////////////////////////////////////////////////////////////


//
//  function for collecting and displaying lessons
//
function displayLessons() {
  // Fetch Lessons
  var student = loadActiveStudent();
  var id = student.id;
  var i = 0;
  var loopFind = true;
  while (loopFind == true) {
    var lessonName = id + "L" + i;
    if (localStorage.getItem(lessonName) === null) {
      /* When it does not exist */
      loopFind = false;
    } else {
      /* When it exists */
      var loadedLesson = localStorage.getItem(lessonName);
      var parsedLesson = JSON.parse(loadedLesson);
      var foundDate = parsedLesson.date;
      var foundAt = parsedLesson.attended;
      var foundNotes = parsedLesson.notes;

      // create elements
      var mainDiv = document.createElement("div");
      var dateDiv = document.createElement("div");
      var atDiv = document.createElement("div");
      var notesDiv = document.createElement("div");
      var btnDiv = document.createElement("div");
      var dateP = document.createElement("p");
      var atP = document.createElement("p");
      var notesP = document.createElement("p");
      var btnCopy = document.createElement("button");
      var copyText = document.createTextNode("Copy");
      var notesNode = document.createTextNode(foundNotes);
      var atNode = document.createTextNode(foundAt);
      var dateNode = document.createTextNode(foundDate);

      // create ids
      var dateId = i + "Date";
      var atId = i + "At";
      var notesId = i + "Notes";
      var btnId = i + "Btn";
      var notesPId = "copyBtn" + i;

      // set id's and classes
      mainDiv.setAttribute("id", lessonName);
      mainDiv.setAttribute("class", "lesson-module wrapper--bigger-left");
      dateDiv.setAttribute("id", dateId);
      dateDiv.setAttribute("class", "row__medium-1");
      atDiv.setAttribute("id", atId);
      atDiv.setAttribute("class", "row__medium-1");
      notesDiv.setAttribute("id", notesId);
      notesDiv.setAttribute("class", "row__medium-4");
      btnDiv.setAttribute("id", btnId);
      btnDiv.setAttribute("class", "row__copy-btn");
      notesP.setAttribute("id", notesPId);
      btnCopy.setAttribute("class", "copyBtn");
      btnCopy.setAttribute("name", i);

      // Putting elements inside each other
      btnCopy.appendChild(copyText);
      btnDiv.appendChild(btnCopy);
      notesP.appendChild(notesNode);
      notesDiv.appendChild(notesP);
      atP.appendChild(atNode);
      atDiv.appendChild(atP);
      dateP.appendChild(dateNode);
      dateDiv.appendChild(dateP);
      mainDiv.appendChild(dateDiv);
      mainDiv.appendChild(atDiv);
      mainDiv.appendChild(notesDiv);
      mainDiv.appendChild(btnDiv);

      var element = document.getElementById("lesson-module-container");
      if (i == 0) {
        var child = document.getElementById("start-lesson");
        element.insertBefore(mainDiv, child);
      } else {
        var s = i - 1;
        var previousLesson = student.id + "L" + s;
        var child = document.getElementById(previousLesson);
        element.insertBefore(mainDiv, child);
      }
      i++;
    }
  }
};
//////////////////////////////////////////////////////////////////////////////

//
//  function for adding a new lesson
//
function addLesson() {
  // Date
  var userDate = $(".new-lesson-modal__date--input").val();
  if ( userDate ) {
    // Attendance
    if ( document.getElementById('atYes').checked ) {
      var atVal = $('#atYes').val();
    } else {
      if ( document.getElementById('atNo').checked ) {
        var atVal = $('#atNo').val();
      } else {
        alert("please select an attendance");
      }
    }
  } else {
    alert("Please enter correct date");
  }

  // Notes
  var userNotes = $(".new-lesson-modal__lesson-notes--input").val();

  // creating the lesson
  var student = loadActiveStudent();
  var id = student.id;
  var i = 0;
  var loopFind = true;
  while (loopFind == true) {
    var lessonName = id + "L" + i;
    if (localStorage.getItem(lessonName) === null) {

      /* When it does not exist */
      var lesson = {
        date: userDate,
        attended: atVal,
        notes: userNotes
      };
      localStorage.setItem(lessonName, JSON.stringify(lesson));
      alert("Lesson created");
      loopFind = false;
      location.reload();
    } else {
      /* When it exists */
      i++;
    }
  }
};
//////////////////////////////////////////////////////////////////////////////


//
//  This monitors when a New Lesson Button is clicked and performs the function
//
$(".new-lesson-button").click(function() {
  makeModalVisible();
});
//////////////////////////////////////////////////////////////////////////////

//
//  Monitors when cancel lesson button is clicked
//
$("#add-lesson").click(function() {
  addLesson();
  hideModal();
});
//////////////////////////////////////////////////////////////////////////////

//
//  Monitors when add lesson button is clicked
//
$("#cancel-lesson").click(function() {
  hideModal();
});
//////////////////////////////////////////////////////////////////////////////

//
//  Functions for modal
//
function makeModalVisible() {
    $("#new-lesson-modal").removeClass("modal__hidden").addClass("modal__visible");
  };

function hideModal() {
    $("#new-lesson-modal").removeClass("modal__visible").addClass("modal__hidden");
  };
//////////////////////////////////////////////////////////////////////////////

//
//  This is function to create song objects
//
function createSong() {
  var playSong = document.createElement("audio");
//  var songId = $(".playback-section").attr('id');
//  var folderPath = $(".playback-section").attr('name');
//  var songPath = folderPath + songId + ".mp3";
//  playSong.setAttribute("src", songPath);

    //
    //  Monitors when the song play button is clicked
    //
    $(".song__button-play").click(function() {
      var btnType = $(this).attr('name');
      var songId = this.parentNode.id;
      var folderPath = $("#"+songId).attr('name');
      if (btnType == "f") {
        var songPath = folderPath + songId + "-f.mp3";
        playSong.setAttribute("src", songPath);
      } else {
        if (btnType == "b") {
          var songPath = folderPath + songId + "-b.mp3";
          playSong.setAttribute("src", songPath);
        } else {
          var songPath = folderPath + songId + "-b.mp3";
          playSong.setAttribute("src", songPath);
          playSong.currentTime = btnType;
        }
      }
      playSong.play();
    });
    //////////////////////////////////////////////////////////////////////////////

    //
    //  Monitors when the song stop button is clicked
    //
    $(".song__button-stop").click(function() {
      playSong.pause();
    });
    //////////////////////////////////////////////////////////////////////////////
};
//////////////////////////////////////////////////////////////////////////////

//
//  This is function to create metronome sound objects
//
function createMetronomeSounds() {
  var playMetro = document.createElement("audio");

    //
    //  Monitors when the metronome play button is clicked
    //
    $(".metronome__button-play").click(function() {
      var setTempo = $("#mainTempo").html();
      var sauce = "../audio/metronome/" + setTempo + ".mp3";
      playMetro.loop = true;
      playMetro.setAttribute("src", sauce);
      playMetro.play();
    });
    //////////////////////////////////////////////////////////////////////////////

    //
    //  Monitors when the metronome play button is clicked
    //
    $(".metronome__button-stop").click(function() {
      playMetro.pause();
    });
    //////////////////////////////////////////////////////////////////////////////
};
//////////////////////////////////////////////////////////////////////////////



//
//  Monitors when the metronome tempo-adjust button is clicked
//
$(".tempoAdjust").click(function() {
  tempoAdjust(this.id);
});
//////////////////////////////////////////////////////////////////////////////

//
//  Tempo clicked function
//
function tempoAdjust(adjustDir) {
  var startTempo = $("#mainTempo").html();
  var newTempo;
  if ( adjustDir == "tempoMinus" ) {
    var newTempo = startTempo - 5;
      if (newTempo < 50) {newTempo = 50};
    $("#mainTempo").html(newTempo);
  } else {
    if ( adjustDir == "tempoPlus" ) {
      var newTempo = startTempo - 5 + 10;
      if (newTempo > 160) {newTempo = 160};
      $("#mainTempo").html(newTempo);
    }
  }
};
//////////////////////////////////////////////////////////////////////////////

//
//  Monitors when a tempo checkbox is clicked
//
$(".tempo").click(function() {
  tempoCompleted(this.id);
});
//////////////////////////////////////////////////////////////////////////////

//
//  Tempo clicked function
//
function tempoCompleted(tempoCode) {
  var student = loadActiveStudent();
  if ( student[tempoCode] ) {
  } else {
    student[tempoCode] = true;
    saveStudent(student.id, student);
    makeStudentActive(student);
    refreshTempo();
  }

};
//////////////////////////////////////////////////////////////////////////////

//
//  This is the function to refresh the tempo section of current page
//

function refreshTempo() {
  $('.loadTempo').each(function(){
    var student = loadActiveStudent();
    var prop = $(this).attr('id');
    if ( student[prop] ) {
      $(this).removeClass("tempo-container__button--not-completed").addClass("tempo-container__button--completed").prop('checked', true);
    }
 });
};
//////////////////////////////////////////////////////////////////////////////

//
//  This is the function to refresh the progress section of levels page
//

function refreshProgress() {
  $('.loadProgress').each(function(){
    var student = loadActiveStudent();
    var prop = $(this).attr('id');
    if ( student[prop] ) {
      $(this).removeClass("greyd").addClass("greend");
    }
 });
};
//////////////////////////////////////////////////////////////////////////////

//
//  This is the function to refresh the page with current content
//
function refreshStudent() {
  $('.loadMe').each(function(){
    //if statement here
    // use $(this) to reference the current div in the loop
    var student = loadActiveStudent();
    var prop = $(this).attr('name');
    if ( student[prop] ) {
      $(this).html(student[prop]);
    } else {
      $(this).html("");
    }
 });
};
//////////////////////////////////////////////////////////////////////////////

//
//  This is the function to load a stored student
//
function loadStoredStudent(userId) {
  var loadedStudent = localStorage.getItem(userId);
  var parsedStudent = JSON.parse(loadedStudent);
  return parsedStudent;
};
//////////////////////////////////////////////////////////////////////////////

//
//  This is the function to load the active student
//
function loadActiveStudent() {
  var loadedStudent = localStorage.getItem('activeUser');
  var parsedStudent = JSON.parse(loadedStudent);
  return parsedStudent;
};
//////////////////////////////////////////////////////////////////////////////

//
//  This is the function to make student active
//
function makeStudentActive(activate) {
  localStorage.setItem('activeUser', JSON.stringify(activate));
};
//////////////////////////////////////////////////////////////////////////////

//
//  This is the function to save a student
//
function saveStudent(id, student) {
  localStorage.setItem(id, JSON.stringify(student));
};
//////////////////////////////////////////////////////////////////////////////

//
//  Monitors when a reveal button is clicked
//
$(".reveal").dblclick(function() {
  revealItem(this.id);
});
//////////////////////////////////////////////////////////////////////////////

//
//  Reveal function
//
function revealItem(search) {
  var x = search + "-input";
  $("#"+x).toggleClass("hideMe visible");
};
//////////////////////////////////////////////////////////////////////////////


//
//  This monitors when a create button is clicked
//
$(".createBtn").click( function() {
  createItem(this.name);
});
//////////////////////////////////////////////////////////////////////////////

//
//  This function creates a new userId, saves it and makes it active
//
function createItem(create) {
  var x = create + "-input";
  var userId = $("#"+x).val();
  if (localStorage.getItem(userId) === null) { // This code will only run if ID does not exist
      if( userId ) { //  This code will only run if proper value was entered!
        var pName = prompt('Name:');
        var pSurname = prompt('Surname:');
        var pSkill = prompt('Skill Level:');
        var pSchool = prompt('School:');
        var pGrade = prompt('Grade:');
        var pExam = prompt('Exam:');
        var pHand = prompt('Lead Hand:');
        var pContract = prompt('Contract Recieved?');
        var pGender = prompt('Gender:');
        var pBirthday = prompt('Birthday:');
        var pDrum = prompt('Has Drums:');
        var pPPad = prompt('Has Practice Pad:');
        var pMetro = prompt('Has Metronome:');

        var student = {
          id: userId,
          name: pName,
          surname: pSurname,
          skillLevel: pSkill,
          school: pSchool,
          grade: pGrade,
          exam: pExam,
          leadHand: pHand,
          contract: pContract,
          gender: pGender,
          birthday: pBirthday,
          drumkit: pDrum,
          practicePad: pPPad,
          metronome: pMetro
        };

        if (localStorage.getItem("studentList") === null) {
          var studentList = [userId];
        } else {
          var studentList = JSON.parse(localStorage.getItem("studentList"));
          studentList.push(userId);
        };
        localStorage.setItem("studentList", JSON.stringify(studentList));
        saveStudent(userId, student);
        makeStudentActive(student);
        alert("New Student with id: " + userId + " created!");
        } else {
          alert("Enter proper value");
        }
        location.reload();
    } else { // This code runs if ID already exists
      var student = loadStoredStudent(userId);
      makeStudentActive(student);
      refreshStudent();
      location.reload();
      }

};
//////////////////////////////////////////////////////////////////////////////


//
//  This monitors when an update button is clicked
//
$(".updateBtn").click( function() {
  updateItem(this.name);
});
//////////////////////////////////////////////////////////////////////////////

//
//  This function updates current user properties, saves it and makes it active
//
function updateItem(prop) {
  var x = prop + "-input";
  var propval = $("#"+x).val();

  if( propval ) { //  This code will only run if proper value was entered!
    var student = loadActiveStudent();
    student[prop] = propval;
    saveStudent(student.id, student);
    makeStudentActive(student);
    refreshStudent();
    } else {
      alert("Enter proper value");
    }


};
//////////////////////////////////////////////////////////////////////////////



/*
      //
      //  Monitors when a refresh button is clicked
      //
      $("#refreshBtn").click(function() {
        refreshStudent();
      });
      //////////////////////////////////////////////////////////////////////////////
*/
