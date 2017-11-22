// Set the date we're counting down to
var countDownDate = new Date().getTime();

// window.onload = function() {
//   var sum = 0;
//   for (i = 1; i < 1000; i++) {
//     if (i%5==0 || i%7==0) {
//       sum += i;
//     }
//   }
//   document.getElementById("sentence").innerHTML = "Sum: " + sum;
// };

function completion() {
  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now an the count down date
  var distance =  now - countDownDate;

  // Time calculations
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  var millis = Math.floor(distance % 1000);

  // return the elapsed time in mins & secs
  return minutes + " min " + seconds + " s " + millis + " ms";
}

function myClick() {
  document.getElementsByClassName("middle")[0].getElementsByTagName("h1")[0].innerHTML = "Assignment complete!";
  document.getElementById("sentence").innerHTML = "Congratulations!\nYou finished the assignment in " + completion() + "!";
  document.getElementById("butt").innerHTML = "😎";
  document.getElementById("butt").disabled = true;
}
