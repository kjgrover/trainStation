var config = {
    apiKey: "AIzaSyBTN4ZrT9VjsCrMfC4-gCNfZwnxqpFrqzY",
    authDomain: "kelsey-s-first-project.firebaseapp.com",
    databaseURL: "https://kelsey-s-first-project.firebaseio.com",
    projectId: "kelsey-s-first-project",
    storageBucket: "kelsey-s-first-project.appspot.com",
    messagingSenderId: "847945600370"
  };

firebase.initializeApp(config);

var database = firebase.database();
var name = "";
var role = "";
var start = 0;
var rate = 0;

$("#add-data").on("click", function(event) {

  event.preventDefault();

    name = $("#EmployeeName").val().trim();
    role = $("#employeeRole").val().trim();
    start = $("#employeeStart").val().trim();
    console.log(start)
    rate = $("#employeeRate").val().trim();
    database.ref().push({
    name: name,
    role: role,
    start: start,
    rate: rate,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

var today = new Date();
var todayString = today.toString()
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

console.log(today)

currentTime = todayString.substring(15,21)
currentMilitary = parseInt(todayString.substring(15,21).replace(":",""))

console.log( "this is today "+currentMilitary)

database.ref().on("child_added", function(snapshot) {
          
  var sv = snapshot.val();
  console.log(sv)

  var trainName = sv.name;
  var destination = sv.role;
  var firstTrain = sv.start;
  var trainFrequency = sv.rate;
  var firstTrainClean = firstTrain.replace(":", "")
  var firstTrainMilitary = parseInt(firstTrainClean)
  var timeDif = Math.abs(firstTrainMilitary-currentMilitary)
  var difHours = parseInt(timeDif.toString().slice(0,2))
  var difMinutes = parseInt(timeDif.toString().slice(2,4))
  var minutesSince = (difHours*12)+difMinutes
  var timeUntil = minutesSince%trainFrequency          
  var dataArray = [ sv.rate, sv.start, sv.role, sv.name, timeUntil, currentTime ]
  
  console.log(dataArray)

  var dataTR = $("<tr> </tr>");
  for (i=0; i<dataArray.length; i++) {
    var instaData = $("<td> </td>")
    
    instaData.text(dataArray[i])

    dataTR.prepend(instaData)

  }

  $(".appendData").append(dataTR)
       
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
  });