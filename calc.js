var todayDate = new Date(); // Should be A day
var finalText;
var dayName = "";

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

        finalText = "No school today. The next school day is " + getDay(nextDay);
    }

} else {
    // Change verb if the time is after 2:03 PM ET.
    var verb = "is";
    if (todayDate.getUTCHours() >= 18 && todayDate.getUTCMinutes() >= 3) {
        verb = "was";
    }

    finalText = "<div class='date'>" + compileFullDate(todayDate) + "</div>, and it " + verb + getDay(todayDate);
}

/* Set the 'day' div to display the date and day */
$(document).ready(function() {
    $(".day").html(finalText);

    $(".date").live('click', function() {
        if ($(".date input").attr("id") == "userDate") {
            $("#userDate").keyup(function() {
                // Get the limit from maxlength attribute
                var limit = parseInt($(this).attr('maxlength'));

                // Get the current text inside the textbox
                var text = $(this).val();

                // Check if the month is greater than 12, set it to 12
                if (parseInt(text.substr(0, 2)) > 12) {
                    $(this).attr("value", 12 + text.substr(2));
                }

                // Get the number of characters in the text variable
                var chars = text.length;

                // Check if there are more characters than the limit allows
                if (chars > limit) {
                    // If there are use, substr to get the text up to the limit
                    var newText = text.substr(0, limit);

                    // Replace the current text with the new text
                    $(this).val(newText);
                }

                // Calculate day, and return to non-input layout
                if (chars == 10) {
                    var dateString = $(this).val().replace("/", "-");
                    var inputDate = new Date(dateString);

                    var verb;
                    if (inputDate < todayDate) {
                        verb = "was";
                    } else {
                        verb = "is";
                    }

                    finalText = "<div class='date'>" + compileFullDate(inputDate) + "</div> " + verb + getDay(inputDate);
                    $(".day").html(finalText);
                }
            });
        } else {
            // Create new text input that automatically adds slashes, and only allows numbers
            $(".date").html("<input id='userDate' type='text' maxlength='10' onkeyup='addSlashes(this);' onkeypress='return event.charCode >= 48 && event.charCode <= 57;' placeholder='MM/DD/YYYY'>");
        }
    });
});

function addSlashes(input) {
    var v = input.value;
    if (v.match(/^\d{2}$/) !== null) {
        input.value = v + '/';
    } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
        input.value = v + '/';
    }
}

/* Returns either A or B day */
function getDay(date) {
    var masterDate = new Date(2015, 2, 9); // Starting date
    var day = 'A'; // Starting Monday schedule day

    while (masterDate <= date) {
        // Skip weekends
        if (masterDate.getDay() != 0 && masterDate.getDay() != 6 && !isDayOff(masterDate)) {
            if (day == 'A') {
                day = 'B';
            } else {
                day = 'A';
            }
        }

        masterDate.setDate(masterDate.getDate() + 1); // Increment the date
    }

    if (day == 'B') {
        return " an A-day.";
    } else {
        return " a B-day.";
    }
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

function getDayName(date) {
    switch(date.getDay()) {
        case 0:
            return "Sunday, ";
            break;
        case 1:
            return "Monday, ";
            break;
        case 2:
            return "Tuesday, ";
            break;
        case 3:
            return "Wednesday, ";
            break;
        case 4:
            return "Thursday, ";
            break;
        case 5:
            return "Friday, ";
            break;
        case 6:
            return "Saturday, ";
            break;
    }
}

// Make a non-abbreviated string for the date
function compileFullDate(date) {
    var fullDate;

    if (todayDate.getTime() == date.getTime()) {
        fullDate = "Today is " + getDayName(date);
    } else {
        fullDate = getDayName(date);
    }

    // Get the month
    switch(date.getMonth()) {
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

    fullDate += date.getDate() + ", " + date.getFullYear();
    return fullDate;
}
