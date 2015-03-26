var todayDate = new Date(); // The date and time right now
var finalText; // The full sentence string of the date
var dayName = ""; // The name of the day (A/B)

/* Set the 'day' div to display the date and day */
$(document).ready(function() {
    $(".day").html(calculateDay(todayDate));

    var inputChars = 0;
    var text, chars, newText, limit;

    $(".date").live('click', function() {
        if ($(".date input").attr("id") == "userDate") {

            $("#userDate").keyup(function() {
                // Get the limit from maxlength attribute
                limit = parseInt($(this).attr('maxlength'));

                // Get the current text inside the textbox
                text = $(this).val();

                // Check if the month is greater than 12, set it to 12
                if (parseInt(text.substr(0, 2)) > 12) {
                    $(this).attr("value", 12 + text.substr(2));
                }

                // Get the number of characters in the text variable
                chars = text.length;

                // Check if there are more characters than the limit allows
                if (chars > limit) {
                    // If there are use, substr to get the text up to the limit
                    newText = text.substr(0, limit);

                    // Replace the current text with the new text
                    $(this).val(newText);
                }

                // Calculate day, and return to non-input layout
                if (chars == 10) {
                    var dateString = $(this).val();
                    var slashPos = dateString.indexOf("/");

                    // Converts a key-spammed string to a date string
                    if (slashPos == -1 || slashPos == dateString.lastIndexOf("/")) {
                        dateString.replace("/", ""); // Replace slashes and put them in manually
                        dateString = dateString.substr(0, 2) + "/" + dateString.substr(4); // First slash
                        slashPos = dateString.indexOf("/"); // Position of the new first slash
                        dateString = dateString.substr(0, slashPos + 3) + "/" + dateString.substr(slashPos + 3); // Second slash
                    }

                    // Check for a maximum month value of 12 (December)
                    if (parseInt(dateString.substr(0, 2)) > 12) {
                        dateString = 12 + dateString.substr(2);
                    }

                    var month = parseInt(dateString.substr(0, 2)); // Assign the month to a value

                    // Check for invalid day of the month based on the month entered
                    if (parseInt(dateString.substr(slashPos + 1, 2)) > getDaysInMonth(month)) {
                        dateString = dateString.substr(0, 3) + getDaysInMonth(month) + dateString.substr(slashPos + 3);
                    }

                    var inputDate = new Date(dateString);
                    $(".day").html(calculateDay(inputDate));
                }
            });
        } else {
            // Create new text input that automatically adds slashes, and only allows numbers
            $(".day").html("<div class='date'></div> is a...");
            $(".date").html("<input id='userDate' type='text' maxlength='10' onkeyup='addSlashes(this);' onkeypress='return event.charCode >= 48 && event.charCode <= 57;' placeholder='MM/DD/YYYY'>");
        }
    });
});

// Returns if a date is an A day or B day
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

// Returns if a date is during summer break
function isSummer(date) {
    var summerStart = new Date(2015, 5, 18);
    var summerEnd = new Date(2015, 7, 31);
    if (date >= summerStart && date <= summerEnd) {
        return true;
    }
    return false;
}

// Returns if a date is a scheduled day off
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

        if (datesEqual(dayOff, date)) {
            return true;
        }
    }
    return false;
}

// Returns if school has an emergency closing on a specified date
function isSchoolClosed(date) {
    $.ajax({
        url: 'http://www.hcrhs.k12.nj.us',
        type: 'GET',
        success: function(res) {
            res = $(res);
            res.find('img').remove();
            var newsAlert = $(res.responseText).find('.module.news.news-alert li h4').text();
            if (newsAlert.indexOf("closed") > -1 && newsAlert.indexOf(getMonthDate(date) + date.getDate()) > -1) {
                return true;
            }
        }
    });
    return false;
}

// Returns the string for the name of the day
function getDayName(date) {
    var dayOfWeek;
    switch(date.getDay()) {
        case 0:
            dayOfWeek = "Sunday, ";
            break;
        case 1:
            dayOfWeek = "Monday, ";
            break;
        case 2:
            dayOfWeek = "Tuesday, ";
            break;
        case 3:
            dayOfWeek = "Wednesday, ";
            break;
        case 4:
            dayOfWeek = "Thursday, ";
            break;
        case 5:
            dayOfWeek = "Friday, ";
            break;
        case 6:
            dayOfWeek = "Saturday, ";
            break;
    }
    return dayOfWeek;
}

// Returns the full month name in English
function getMonthName(date) {
    var monthName;
    switch(date.getMonth()) {
        case 0:
            monthName = "January";
            break;
        case 1:
            monthName = "February";
            break;
        case 2:
            monthName = "March";
            break;
        case 3:
            monthName = "April";
            break;
        case 4:
            monthName = "May";
            break;
        case 5:
            monthName = "June";
            break;
        case 6:
            monthName = "July";
            break;
        case 7:
            monthName = "August";
            break;
        case 8:
            monthName = "September";
            break;
        case 9:
            monthName = "October";
            break;
        case 10:
            monthName = "November";
            break;
        case 11:
            monthName = "December";
            break;
    }
    return monthName;
}

// Returns a non-abbreviated string for the date in English
function compileFullDateString(date) {
    var fullDate;

    if (datesEqual(date, todayDate)) {
        fullDate = "Today is " + getDayName(date);
    } else {
        fullDate = getDayName(date);
    }

    fullDate += getMonthName(date) + " " + date.getDate() + ", " + date.getFullYear();
    return fullDate;
}

// Returns a string with the next valid school day
function getNextValidDay() {
    var nextDay = new Date(); // Increment the date
    nextDay.setDate(todayDate.getDate() + 1);

    // Check for summer break. This might be cool if it actually happened.
    if (isSummer(nextDay)) {
        return "No school today. I guess that means it's the start of your summer break.";
    } else {

        // Get the next school day
        while (isDayOff(nextDay)) {
            nextDay.setDate(nextDay.getDate() + 1); // Increment the date
        }
        return "No school today. The next school day is " + getDay(nextDay);
    }
}

// Returns the final string to output with the date
function calculateDay(date) {
    if (isSummer(date)) {
        finalText = "It's your Summer Break, don't worry about it!";
    } else if (datePassed(date) && historicSummer(date)) {
        finalText = compileFullDateString(date) + " was most-likely during Summer Break.";
    } else if (isDayOff(date) || isSchoolClosed(date)) {
        if (datePassed(date)) {
            finalText = "There was no school on " + compileFullDateString(date) + ".";
        } else {
            finalText = getNextValidDay();
        }
    } else {
        var verb = "is";

        if (date.getTime() > todayDate.getTime()) {
            verb = "will be";
        } else {
            if (datePassed(date)) {
                verb = "was";
            } else {
                verb = "is";
                // Change verb if the time is after 2:03 PM ET.
                if (date.getUTCHours() >= 18 && date.getUTCMinutes() >= 3) {
                    verb = "was";
                }
            }
        }

        if (datesEqual(date, todayDate)) {
            finalText = "<div class='date'>" + compileFullDateString(date) + "</div>, and it " + verb + getDay(date);
        } else {
            finalText = "<div class='date'>" + compileFullDateString(date) + "</div> " + verb + getDay(date);
        }
    }
    return finalText;
}

// Returns if the date entered was during a past Summer Break
function historicSummer(date) {
    // If the date is in July or August, it must be Summer Break
    if (date.getMonth() == 6 || date.getMonth() == 7) {
        return true;
    }
    return false;
}

// Returns if the date entered is historic
function datePassed(date) {
    if (date.getTime() < todayDate.getTime()) {
        return true;
    }
    return false;
}

// Returns boolean value whether two dates are equal (year, month, day)
function datesEqual(date1, date2) {
    if (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate()) {
        return true;
    }
    return false;
}

// Returns the amount of days in a given month
function getDaysInMonth(month) {
    var numberOfDays;
    switch (month) {
        case 1:
            numberOfDays = 31;
            break;
        case 2:
            if ((dateString.length - 1) % 4 == 0) {
                numberOfDays = 29;
            } else {
                numberOfDays = 28;
            }
            break;
        case 3:
            numberOfDays = 31;
            break;
        case 4:
            numberOfDays = 30;
            break;
        case 5:
            numberOfDays = 31;
            break;
        case 6:
            numberOfDays = 30;
            break;
        case 7:
            numberOfDays = 31;
            break;
        case 8:
            numberOfDays = 31;
            break;
        case 9:
            numberOfDays = 30;
            break;
        case 10:
            numberOfDays = 31;
            break;
        case 11:
            numberOfDays = 30;
            break;
        case 12:
            numberOfDays = 31;
            break;
    }
    return numberOfDays;
}

// Add a slashes as the user enters a date
function addSlashes(input) {
    var v = input.value;
    if (v.match(/^\d{2}$/) !== null) {
        input.value = v + '/';
    } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
        input.value = v + '/';
    }
}
