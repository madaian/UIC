/* Code for the group assignment */

// On page load
$(document).ready(function(){
  refresh();
});

// Create translation file rows
function RequestForTranslation(name, status, size, date, deadline) {
  this.name = name;
  this.status = status;
  this.size = size;
  this.date = date;
  this.deadline = deadline;
}

var firstFile = new RequestForTranslation("Tiedosto", "under work", 500, "2017-11-13", "2017-11-31");
var secondFile = new RequestForTranslation("File", "waiting", 42, "2017-11-23", "2017-12-31");
var thirdFile = new RequestForTranslation("Form", "waiting", 420, "2017-01-23", "2018-01-31");

// All the rows for the translation table
var rows = [firstFile, secondFile, thirdFile];
// The keys for the objects that make up the rows
var rowKeys = ['name', 'status', 'size', 'date', 'deadline'];

// Recreates the translation table
function refresh() {
  // Clear the table
  $('tbody').empty();
  // Insert each row into the table
  var ind = 0;
  rows.forEach(function(item){
    $('tbody').append('<tr onclick="tableClick(' + ind + ')"><td>' + item.name + '</td><td>' +
    item.status + '</td><td>' + item.size + '</td><td>' + item.date + '</td><td>' +
    item.deadline + '</td></tr>');
    ind++;
  });
}

// Called when a row in the table is clicked
function tableClick(index) {
  $("#original .card-text").text("Lorem ipsum I'm text in a foreign language from the file " + rows[index].name + "!");
  $("#translation textarea").text("Lorem ipsum I'm the text from " + rows[index].name + " but already translated (a bit) into your first language!");
}

// Sort the Array 'rows' based on the chosen column
function sortBy(column) {
  var tmp, sorting, shouldSwitch, i, x, y, key;
  key = rowKeys[column];
  do {
    // Start by saying: no switching is done:
    sorting = false;
    // Loop through all table rows:
    for (i = 0; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i][key];
      y = rows[i + 1][key];
      //check if the two rows should switch place:
      if (x > y) { // TODO: check if different data types cause problems
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
	    /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      tmp = rows[i];
      rows[i] = rows[i + 1];
      rows[i + 1] = tmp;
      sorting = true;

    }
  } while (sorting);
  // Automatically rearrange the table
  refresh();
}

/* Code from the individual assignment for checking purposes */

// Set the date we're counting down to
var countDownDate = new Date().getTime();

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
  $("#eb").text("Assignment complete!");
  $('#sentence').text("Congratulations!\nYou finished the assignment in " + completion() + "!");
  $("#butt").text("😎");
  $("#butt").attr("disabled", true);
}
