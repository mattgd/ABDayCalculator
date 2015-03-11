var todayDate = new Date(); // Should be A day
var finalText;

if (isSummer(todayDate)) {
    finalText = "It's your summer break, don't worry about it!";
} else if (isDayOff(todayDate)) {
    var nextDay = new Date(); // Increment the date
    nextDay.setDate(todayDate.getDate() + 1);

    // Check for summer break. This might be cool if it actually happened.
    if (isSummer(nextDay)) {
        finalText = "No school today. I guess that means it's the start of your summer break.";
    } else {
        // Get the next school day
        while (isDayOff(nextDay)) {
            nextDay.setDate(nextDay.getDate() + 1); // Increment the date
        }

        finalText = "No school today. The next school day is a"

        if (getDay(nextDay) == 'B') {
            finalText += "n A-day.";
        } else {
            finalText += " B-day.";
        }
    }

} else {
    // Convert day to string
    if (getDay(todayDate) == 'A') {
        day = "n A-day.";
    } else {
        day = " B-day.";
    }

    // Change verb if the time is after 2:03 PM ET.
    var verb = "is";
    if (todayDate.getUTCHours() >= 18 && todayDate.getUTCMinutes() >= 3) {
        verb = "was";
    }

    finalText = "Today is " + compileFullDate(todayDate) + " and it " + verb + " a" + day;
}

/* Set the 'day' div to display the date and day */
$(document).ready(function() {
    $(".day").text(finalText);
});

/* Returns either A or B day */
function getDay(date) {
    var masterDate = new Date(2015, 2, 9); // Starting date
    var day = 'B'; // Starting Monday schedule day

    while (masterDate <= date) {
        // Skip weekends
        if (masterDate.getDay() != 0 && masterDate.getDay() != 6 && !isDayOff(masterDate)) {
            if (day == 'A') {
                console.log("B");
                day = 'B';
            } else {
                console.log("A");
                day = 'A';
            }
        }

        masterDate.setDate(masterDate.getDate() + 1); // Increment the date
    }
    return day;
}

/* Check if it is summer break. Returns boolean value. */
function isSummer(date) {
    var summerStart = new Date(2015, 5, 18);
    var summerEnd = new Date(2015, 7, 31);
    if (date >= summerStart && date <= summerEnd) {
        return true;
    }
    return false;
}

/* Check if today is a day off. Returns boolean value. */
function isDayOff(date) {

    // Check if 'date' is a weekend
    if (date.getDay() == 0 || date.getDay() == 6) {
        return true;
    }

    // Check if 'date' is a schedule day off
    var daysOff = [ "2015-3-31", "2015-4-1", "2015-4-2", "2015-4-3", "2015-5-25" ];
    var dayOff;
    for (i = 0; i < daysOff.length - 1; i++) {
        dayOff = new Date(daysOff[i]);

        if (dayOff.getFullYear() == date.getFullYear() && dayOff.getMonth() == date.getMonth() && dayOff.getDate() == date.getDate()) {
            return true;
        }
    }
    return false;
}

// Make a non-abbreviated string for the date
function compileFullDate(date) {
    var fullDate;

    switch(todayDate.getDay()) {
        case 0:
            fullDate = "Sunday, ";
            break;
        case 1:
            fullDate = "Monday, ";
            break;
        case 2:
            fullDate = "Tuesday, ";
            break;
        case 3:
            fullDate = "Wednesday, ";
            break;
        case 4:
            fullDate = "Thursday, ";
            break;
        case 5:
            fullDate = "Friday, ";
            break;
        case 6:
            fullDate = "Saturday, ";
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

    fullDate += todayDate.getDate() + ", " + todayDate.getFullYear() + ", ";
    return fullDate;
}
