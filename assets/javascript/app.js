
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

  var name = '';
  var destination = '';
  var time = '';
  var frequency = '';

  $('#submit').on('click', function(){
      event.preventDefault();

      name = $('#name-input').val().trim();
      destination = $('#destination-input').val().trim();
      time = $('#time-input').val().trim();
      frequency = $('#frequency-input').val().trim();


      database.ref().push({
          name,
          destination,
          time,
          frequency,
      });

  })

  database.ref().on("value", function(snapshot){
      console.log(snapshot.val());
      console.log(snapshot.val().name);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().time)
      console.log(snapshot.val().frequency);
  }, function(errorObject){
      console.log("Errors handled: " + errorObject.code)
  });
  