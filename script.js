/* Code for the group assignment */

// On page load
$(document).ready(function(){
  refresh();
});

/* Show() the contents of the div whose id is passed as a parameter,
   hide the rest of the "page" divs.
   Assumes there are max navbar link amount of pages which are in order. */
function show(shown) {
  // TODO: hide navbar in login view
  // Loop through each div marked as main content
  $("div[role='main']").each(function(i) {
    // Make a string to find the page's link in the navbar
    var id = $(this).attr('id');
    var str = ".navbar-nav.ml-auto #nav-" + id;
    if (id === shown) {
      // Make the page visible
      $(this).removeClass('hidden');
      // Make the corresponding item in the navbar active
      $(str).addClass('active');
      // Add info for screen readers about which page is selected
      $(str + " a").append('<span class="sr-only">(current)</span>');
    } else {
      // Other pages and their alerts are hidden
      $(this).addClass('hidden');
      $(this).find('.alert').each(function() {
        $(this).addClass('hidden');
      });
      // And their navbar info is removed
      $(str).removeClass('active');
      $(str + " a span").remove();
    }
  });
}

// Show or hide the mock alerts
function showAlert(id, bool) {
  var element = $("#" + id);
  if (bool) {
    element.removeClass('hidden');
  } else {
    element.addClass('hidden');
  }
}

/* "Validate" login credentials.
   Hint for text fields from JS school:
   https://www.w3schools.com/js/tryit.asp?filename=tryjs_validation_js */
function validateForm() {
  var x = $("#loginform #username").val();
  var y = $("#loginform #passwd").val();
  if (x == "" || y == "") {
    showAlert('logoutSuccess', false);
    showAlert('loginFail', true);
  } else {
    // Reset the form fields and navigate to the front page
    $("#loginform")[0].reset();
    show('page1');
  }
}

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

/* Recreates the translation table
  See: sortBy */
function refresh() {
  // Clear the table
  $('tbody').empty();
  // Insert each row into the table
  var ind = 0;
  rows.forEach(function(item){
    $('tbody').append('<tr onclick="tableClick(' + ind + '); show(\'page2\')"><td>' + item.name + '</td><td>' +
    item.status + '</td><td>' + item.size + '</td><td>' + item.date + '</td><td>' +
    item.deadline + '</td></tr>');
    ind++;
  });
}

// Selects a translation to show when a row in the table is clicked
function tableClick(index) {
  $("#original .card-text").text("Lorem ipsum I'm text in a foreign language from the file " + rows[index].name + "!");
  $("#original .card-title").text(rows[index].name);
  $("#translation textarea").text("Lorem ipsum I'm the text from " + rows[index].name + " but already translated (a bit) into your first language!");
}

/* Sort the Array 'rows' based on the chosen column
  See: refresh() */
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
