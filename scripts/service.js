// Function to verify that the phone number is correct.
// Here, I validate for (12345), but you have to change that for a phone validation
// Tutorials on Regular expressions
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
// https://flaviocopes.com/javascript-regular-expressions/
// Regular expressions can get complex, you can think in terms of a series of characters
// or numbers
function validatePhone(txtPhone) {
    var a = document.getElementById(txtPhone).value;
    // This filter asks for something like (12345), so parentheses with any number (at least 1)
    // of digits
    var filter = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (filter.test(a)) {
        return true;
    } else {
        return false;
    }
}

function validateDebit(txtDebit) {
    var a = document.getElementById(txtDebit).value;
    // This filter asks for something like (12345), so parentheses with any number (at least 1)
    // of digits
    var filter = /^\(?([0-9]{4})\)?[- ]?([0-9]{4})[- ]?([0-9]{4})[- ]?([0-9]{4})$/;
    if (filter.test(a)) {
        return true;
    } else {
        return false;
    }
}


// regex taken from https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
function validateEmail(txtEmail) {
    var a = document.getElementById(txtEmail).value;
    // This filter asks for something like (12345), so parentheses with any number (at least 1)
    // of digits
    var filter = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (filter.test(a)) {
        return true;
    } else {
        return false;
    }
}

// Using date restrictions on datepicker
// Document of datepicker is here: https://api.jqueryui.com/datepicker/
// The following code shows how to set specific dates to exclude, as well as Sundays (Day 0)
// Make sure in your version that you associate Days to remove with Experts (e.g. John doesn't work Mondays)
var unavailableDates = ["06/29/2020", "07/07/2020", "07/10/2020"];
const setDateFormat = "mm/dd/yy";

function disableDates(date) {
    // Sunday is Day 0, disable all Sundays
    if (date.getDay() === 0)
        return [false];
    var string = jQuery.datepicker.formatDate(setDateFormat, date);
    return [unavailableDates.indexOf(string) === -1]
}


// HERE, JQuery "LISTENING" starts
$(document).ready(function() {

    // phone validation, it calls validatePhone
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the phone input
    // The "error" class in style.css defines yellow background and red foreground
    $("#phone").on("change", function() {
        if (!validatePhone("phone")) {
            alert("Wrong format for phone");
            $("#phone").val("");
            $("#phone").addClass("error");
        } else {
            $("#phone").removeClass("error");
        }
    });
    $("#debit").on("change", function() {
        if (!validateDebit("debit")) {
            alert("Wrong format for Credit card");
            $("#debit").val("");
            $("#debit").addClass("error");
        } else {
            $("#debit").removeClass("error");
        }
    });
    $("#email").on("change", function() {
        if (!validateEmail("email")) {
            alert("Wrong format for Email");
            $("#email").val("");
            $("#email").addClass("error");
        } else {
            $("#email").removeClass("error");
        }
    });


    // To change the style of the calender, look in jqueryui.com, under Themes, in the ThemeRoller Gallery
    // You can try different themes (the names are under the calendars) / This is Excite Bike
    // To use a different theme you must include its css in your HTML file.
    // The one I included in my HTML is the Excite Bike, but you can try others

    // Also, here is a good tutorial for playing with the datepicker in https://webkul.com/blog/jquery-datepicker/
    // Datepicker is also documented as one of the widgets here: https://api.jqueryui.com/category/widgets/
    $("#dateInput").datepicker({
        dateFormat: setDateFormat,
        // no calendar before June 1rst 2020
        minDate: new Date('06/01/2020'),
        maxDate: '+4M',
        // used to disable some dates
        beforeShowDay: $.datepicker.noWeekends,
        beforeShowDay: disableDates
    });

    $('#timeSel').timepicker({
        'disableTimeRanges': [
            ['12am', '8am'],
            ['12pm', '1pm'],
            ['5pm', '11pm']
        ]

    });
    // Look at the different events on which an action can be performed
    // https://www.w3schools.com/jquery/jquery_events.asp
    // Here, we put
    $("#debit").on("mouseenter", function() {
        $("#debit").addClass("showInput");
    });

    $("#debit").on("mouseleave", function() {
        $("#debit").removeClass("showInput");
    });
    $("#phone").on("mouseenter", function() {
        $("#email").addClass("showInput");
    });

    $("#phone").on("mouseleave", function() {
        $("#email").removeClass("showInput");
    });

    // https://jqueryui.com/tooltip/
    // The class "highlight" used here is predefined in JQuery UI
    // the message of the tooltip is encoded in the input (in the HTML file)
    $("#debit").tooltip({
        track: true,
        classes: {
            "ui-tooltip": "highlight"

        }
    });
    $("#submit").click(function() {
        var firstname = $("#firstName").val();
        var email = $("#email").val();
        var date = $("#dateInput").val();
        var time = $("#timeSel").val();
        var expert = $("#expert").val();
        var typeAppointment = $("#typeAppointment").val();
        var lastname = $("#lastname").val();
        var debit = $("#debit").val();
        var birthday = $("#birthday").val();
        var phone = $("#phone").val();

        if (firstname == "" || email == "" || date == "" || time == "" || expert == "" || typeAppointment == "" || lastname == "" || debit == "" || birthday == "" || phone == "") {
            alert("One or more fields are empty!");
        } else {
            $('#exampleModal').modal('hide');
            $('#info').modal('show');
            var str = "Thank you " + firstname + " for booking with us! \n\n Your " + typeAppointment + " appointment with " + expert + " is for " + date + " at " + time + "\n";
            var str2 = "A confirmation email will be sent to you: " + email;
            $("#test").text(str);
            $("#test2").text(str2);

        }




    });

});