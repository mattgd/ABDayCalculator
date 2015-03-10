var masterDay = 'A'; // Starting Monday day
var masterDate = new Date(2015, 2, 9); // Starting date

var todayDate = new Date();
var fullDate = "";
var day = 'A';

console.log(masterDate + " : " + todayDate);

while (masterDate <= todayDate) {
    // Skip weekends
    if (masterDate.getDay() != 0 && masterDate.getDay() != 6) {
        if (day == 'A') {
            day = 'B';
        } else {
            day = 'A';
        }
    }

    masterDate++;
}

// Convert day to string
if (day == 'A') {
    day = "n A day.";
} else {
    day = " B day.";
}

switch(todayDate.getDay()) {
    case 0:
        fullDate += "Sunday, ";
        break;
    case 1:
        fullDate += "Monday, ";
        break;
    case 2:
        fullDate += "Tuesday, ";
        break;
    case 3:
        fullDate += "Wednesday, ";
        break;
    case 4:
        fullDate += "Thursday, ";
        break;
    case 5:
        fullDate += "Friday, ";
        break;
    case 6:
        fullDate += "Saturday, ";
        break;
}

// Get the month
switch(todayDate.getMonth()) {
    case 0:
        fullDate += "January ";
        break;
    case 1:
        fullDate += "February ";
        break;
    case 2:
        fullDate += "March ";
        break;
    case 3:
        fullDate += "April ";
        break;
    case 4:
        fullDate += "May ";
        break;
    case 5:
        fullDate += "June ";
        break;
    case 6:
        fullDate += "July ";
        break;
    case 7:
        fullDate += "August ";
        break;
    case 8:
        fullDate += "September ";
        break;
    case 9:
        fullDate += "October ";
        break;
    case 10:
        fullDate += "November ";
        break;
    case 11:
        fullDate += "December ";
        break;
}

fullDate += todayDate.getDate() + ", " + todayDate.getFullYear();

// Set the 'day' div to display the date and day
$(document).ready(function() {
    $(".day").text("Today is " + fullDate + " and it is a" + day);
});
