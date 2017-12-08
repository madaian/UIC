/* Code for the group assignment */

// Hardcoded user profile data
var userProfile = {
  "username" : "TiinaT",
  "password" : "1234",
  "firstname" : "Tiina",
  "familyname" : "Teekkari",
  "nickname" : "Tite",
  "email" : "tiinat@example.com",
  "languages" : ["Chinese", "Finnish", "Swedish"],
  "native" : "English"
};

// Hardcoded possible languages in alphabetical order
var allLanguages = ["Arabic", "Chinese", "English", "Estonian", "Finnish", "French", "Swedish"];

// On page load
$(document).ready(function(){
  // Add languages to the language changing things
  allLanguages.forEach(addLanguage);
  // Fill in user profile page
  $('#cred-username').attr('placeholder', userProfile.username);
  $('#firstname').attr('placeholder', userProfile.firstname);
  $('#familyname').attr('placeholder', userProfile.familyname);
  $('#nickname').attr('placeholder', userProfile.nickname);
  $('#emailaddress').attr('placeholder', userProfile.email);
  // Show the table in order by deadline by default
  sortBy(4);
});

function addLanguage(lang, ind) {
  if (userProfile.languages.includes(lang)) {
    // Add known languages into translation table
    $('#languages').append('<a class="dropdown-item" onclick="changeLanguage(' + ind + ')" href="#">' + lang + '</a>');
    // Select them in profile source language selector & add as a possible target language
    $('#sourceLanguages').append("<option selected>" + lang + "</option>");
    $('#targetLanguages').append("<option>" + lang + "</option>");
  } else if (userProfile.native === lang) {
    // Only add native language in the profile language selector (selected), not in the translation table
    $('#sourceLanguages').append("<option selected>" + lang + "</option>");
    // Add and select native language in the profile target language selector
    $('#targetLanguages').append("<option selected>" + lang + "</option>");
  } else {
    // The rest are unselected in the profile language selectors
    $('#sourceLanguages').append("<option>" + lang + "</option>");
    $('#targetLanguages').append("<option>" + lang + "</option>");
  }
}

/* Show() the contents of the div whose id is passed as a parameter,
   hide the rest of the "page" divs.
   Assumes there are max navbar link amount of pages which are in order. */
function show(shown) {
  // Resets every selection in the profile forms
  $("#formcards form").each(function () {
    $(this)[0].reset();
  });
  /* Hide navbar navigation links in login view & have the brand show the login page.
     Else show the links and have the brand navigate to the translation table. */
  if (shown === "login") {
    $("#brand-nav").attr('onclick', "show('login')");
    $("#navbarResponsive ul").addClass('hidden');
  } else {
    $("#brand-nav").attr('onclick', "show('page1')");
    $("#navbarResponsive ul").removeClass('hidden');
  }
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
function validateLoginForm() {
  var x = $("#loginform #username").val();
  var y = $("#loginform #passwd").val();
  // Login only if the credentials from the userProfile are used
  if (x == userProfile.username && y == userProfile.password) {
    // Reset the form fields and navigate to the front page
    $("#loginform")[0].reset();
    show('page1');
  } else {
    showAlert('logoutSuccess', false);
    showAlert('loginFail', true);
  }

  // Uncomment for easier development
  // if (x == "" || y == "") {
  //   showAlert('logoutSuccess', false);
  //   showAlert('loginFail', true);
  // } else {
  //   // Reset the form fields and navigate to the front page
  //   $("#loginform")[0].reset();
  //   show('page1');
  // }
}

// Create translation file rows
function RequestForTranslation(name, status, wordcount, date, deadline, translation) {
  this.name = name;
  this.status = status;
  this.wordcount = wordcount;
  this.date = date;
  this.deadline = deadline;
  this.translation = "Lorem ipsum I'm the text from " + this.name + " but already translated (a bit) into your first language!";
}

function changeTranslation(request, trans) {
  request.translation = trans;
}

var firstFile = new RequestForTranslation("Tiedosto", "under work", 500, "2017-11-13", "2017-11-31", "");
var secondFile = new RequestForTranslation("File", "waiting", 42, "2017-11-23", "2017-12-31", "");
var thirdFile = new RequestForTranslation("Form", "waiting", 420, "2017-01-23", "2018-01-31", "");

var chiFirst = new RequestForTranslation("Chinese Tiedosto", "waiting", 500, "2017-11-13", "2017-11-31", "");
var chiSecond = new RequestForTranslation("Chinese File", "under work", 42, "2017-11-23", "2017-12-31", "");
var chiThird = new RequestForTranslation("Chinese Form", "waiting", 420, "2017-01-23", "2018-01-31", "");
var chiFourth = new RequestForTranslation("Chinese Document", "under work", 26, "2017-03-07", "2018-05-21", "");

var finRows = [firstFile, secondFile, thirdFile];
var chiRows = [chiFirst, chiSecond, chiThird, chiFourth];
// All the rows for the translation table; Starting with Finnish
var rows = finRows;
// The keys for the objects that make up the rows
var rowKeys = ['name', 'status', 'wordcount', 'date', 'deadline', 'translation'];

// Change which requests to show in the table
function changeLanguage(ind) {
  // We only can swap between "Chinese" and "Finnish"
  if (ind == 4) {
    rows = finRows;
  } else {
    rows = chiRows;
  }
  sortBy(4);
}

/* Recreates the translation table
  See: sortBy */
function refresh() {
  // Clear the table
  $('tbody').empty();
  // Insert each row into the table
  var ind = 0;
  rows.forEach(function(item){
    $('tbody').append('<tr onclick="tableClick(' + ind + '); show(\'page2\')"><td>' + item.name + '</td><td>' +
    item.status + '</td><td>' + item.wordcount + '</td><td>' + item.date + '</td><td>' +
    item.deadline + '</td></tr>');
    ind++;
  });
}

// Selects a translation to show when a row in the table is clicked
function tableClick(index) {
  $("#trans-title").text("Translation of " + rows[index].name);
  $("#original .card-text").text("Lorem ipsum I'm text in a foreign language from the file " + rows[index].name + "!");
  $("#translation textarea").val(rows[index].translation);
  // Changes the save-button to actually save the translation and show the success alert
  $("#translation #save").attr('onclick', "saveTranslation(" + index + "); showAlert('saveSuccess', true)");
  // Changes the submit-button to save the translation, move to the front page and show a success message
  $("#translation #trans-submit").attr('onclick', "saveTranslation(" + index + "); show('page1'); showAlert('submitSuccess', true)");
}

function saveTranslation(index) {
  changeTranslation(rows[index], $("#translation textarea").val());
  // rows[index].translation = $("#translation textarea").val();
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
