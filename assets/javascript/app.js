
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAdbgj1dOoN2eIPSFCny0HLPKObQmDI1UI",
    authDomain: "train-scheduler-82221.firebaseapp.com",
    databaseURL: "https://train-scheduler-82221.firebaseio.com",
    projectId: "train-scheduler-82221",
    storageBucket: "train-scheduler-82221.appspot.com",
    messagingSenderId: "205500883888",
    appId: "1:205500883888:web:f5669b5e41b4d1f1f66c75"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();
  updateTime();
  setInterval(updateTime, 1000);

  $('#submit').on('click', function(){
      event.preventDefault();

      var name = $('#name-input').val().trim();
      var destination = $('#destination-input').val().trim();
      var time = $('#time-input').val().trim();
      var frequency = $('#frequency-input').val().trim();

      database.ref().push({
          name,
          destination,
          time,
          frequency,
          
      });

  })
//logs everything that is coming out of the snapshot
  database.ref().on("child_added", function(childSnapshot){
      console.log(childSnapshot.val());
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().time)
      console.log(childSnapshot.val().frequency);
      
      var name = childSnapshot.val().name;
      var destination = childSnapshot.val().destination;
      var time = childSnapshot.val().time;
      var frequency = childSnapshot.val().frequency;

      var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
      console.log(firstTimeConverted);

      var currentTime = moment();
      console.log("Current Time: " + moment(currentTime).format("HH:mm"));

      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("Difference in Time: " + diffTime);
    //time apart (remainder)
      var tRemainder = diffTime % frequency;
      console.log(tRemainder);
    // minutes until train
      var tMinutesTillTrain = frequency - tRemainder;
      console.log("Minutes till Train: " + tMinutesTillTrain);
    //next train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
      console.log("Arrival Time: "+ moment(nextTrain).format("hh:mm"));


    //appends items to the well
      $(".train-list").append("<tr class='well'><td class='train-name'> " +
      name +
      " </td><td class='train-destination'> " + destination +
      " </td><td class='train-frequency'> " + frequency +
      " </td><td class='train-next'> " + nextTrain +
      " </td><td class='train-minutes'>" + tMinutesTillTrain +
      " </td></tr>");
  }, function(errorObject){
      console.log("Errors handled: " + errorObject.code)
  });

  $('#refresh').on("click", function(){
      location.reload();
  })

  function updateTime(){
      var now = moment().format("hh:mm:ss A");
      console.log(now);
      $(".timer").text(now);
  }
  
  

//   dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
//     // Change the HTML to reflect
//     $("#name-display").text(snapshot.val().name);
//     $("#email-display").text(snapshot.val().email);
//     $("#age-display").text(snapshot.val().age);
//     $("#comment-display").text(snapshot.val().comment);
//   });
