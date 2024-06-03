const inputDay = document.getElementById("day");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");

const dayLabel = document.getElementById("day-label");
const monthLabel = document.getElementById("month-label");
const yearLabel = document.getElementById("year-label");

const outputDay = document.getElementById("day-calculation");
const outputMonth = document.getElementById("month-calculation");
const outputYear = document.getElementById("year-calculation");

const dayError = document.getElementById("day-error");
const monthError = document.getElementById("month-error");
const yearError = document.getElementById("year-error");


const button = document.getElementById("calculate-button");

const numbersOnlyTwoDigits = /^[0-9]{1,2}$|^$/;
const numbersOnlyFourDigits = /^[0-9]{1,4}$|^$/;

const daysInMonth = {
    1: 31, // January
    2: 28, // February (29 in leap years)
    3: 31, // March
    4: 30, // April
    5: 31, // May
    6: 30, // June
    7: 31, // July
    8: 31, // August
    9: 30, // September
    10: 31, // October
    11: 30, // November
    12: 31  // December
};


let day = null;
let month = null;
let year = null;


function loadDefaultValues () {

    inputDay.value = "";
    inputMonth.value = "";
    inputYear.value = "";

    inputDay.placeholder = "DD";
    inputMonth.placeholder = "MM";
    inputYear.placeholder = "YYYY";

    outputDay.textContent = "--";
    outputMonth.textContent = "--";
    outputYear.textContent = "--";
}

function calculateDate () {

    if(!checkValuesNotBlank()) return;

    if(!checkValuesInRange()) return;
    
    if (!checkDateValid()) return;

    if (!checkDateInPast()) return;

    calculateDateDifference();

}

function checkValuesNotBlank () {
    let notBlank = true;
    
    if (inputDay.value == "") {
        displayError("day", "This field is required");
        notBlank = false;
    } else {
        displayError("day", "");
    }
    if (inputMonth.value == "") {
        displayError("month", "This field is required");
        notBlank = false;
    } else {
        displayError("month", "");
    }
    if (inputYear.value == "") {
        displayError("year", "This field is required");
        notBlank = false;
    } else {
        displayError("year", "");
    }

    return notBlank;

}

function checkValuesInRange () {

    let valuesInRange = true;
    const currentYear = new Date().getFullYear();

    if (day > 31) {
        displayError("day", "Must be a valid day");
        valuesInRange = false;
    } else {
        displayError("day", "");
    }

    if (month > 12) {
        displayError("month", "Must be a valid month");
        valuesInRange = false;
    } else {
        displayError("month", "");
    }

    if (year > currentYear) {
        displayError("year", "Must be in the past");
        valuesInRange = false;
    } else {
        displayError("year", "");
    }

    return valuesInRange;

}

function checkDateValid () {

    if (month == 2 && day == 29) {
        return checkIfLeapYear();
    }
    if (day <= daysInMonth[month]) {
        displayError("all", "");
        return true;
    } else {
        displayError("all", "Must be a valid date");
        return false;
    }

}

function checkIfLeapYear() {
    let isLeapYear = false;
    if( year % 4 === 0) {
        isLeapYear = true;
        if (year % 100 === 0) {
            isLeapYear = false;
            if(year % 400 === 0) {
                isLeapYear = true;
            }
        }
    }
    return isLeapYear;
}

function checkDateInPast() {

    let userInputDate = new Date(year, month - 1, day);

    let currentDate = new Date();

    if(userInputDate < currentDate) {
        return true;
    } else {
        displayError("all", "Must be in the past");
        return false;
    }
}

function displayError(date, message) {

    let labelColour = "";
    let borderColour = "";

    if (message == "") {
        labelColour = "var(--smokey-grey)";
        borderColour = "var(--light-grey)";
    } else {
        labelColour = "var(--light-red)";
        borderColour = "var(--light-red)";
    }

    switch(date) {
        case "day":
            dayError.textContent = message;
            inputDay.style.borderColor = borderColour;
            dayLabel.style.color = labelColour;
            break;
        case "month":
            monthError.textContent = message;
            inputMonth.style.borderColor = borderColour;
            monthLabel.style.color = labelColour;
            break;
        case "year":
            yearError.textContent = message;
            inputYear.style.borderColor = borderColour;
            yearLabel.style.color = labelColour;
            break;
        case "all":
            dayError.textContent = message;
            inputDay.style.borderColor = borderColour;
            dayLabel.style.color = labelColour;
            inputMonth.style.borderColor = borderColour;
            monthLabel.style.color = labelColour;
            inputYear.style.borderColor = borderColour;
            yearLabel.style.color = labelColour;
    }
    
}

function calculateDateDifference() {

    const currentDate = new Date();

    let yearDiff = currentDate.getFullYear() - year;
    let monthDiff = (currentDate.getMonth() + 1) - month;
    let dayDiff = currentDate.getDate() - day;

    if (monthDiff < 0) {
        yearDiff -= 1;
        monthDiff += 12;
    }

    if (dayDiff < 0 ) {
        dayDiff += daysInMonth[month]
    }

    outputYear.textContent = yearDiff;
    outputMonth.textContent = monthDiff;
    outputDay.textContent = dayDiff;

}


document.addEventListener('DOMContentLoaded', () => {
    loadDefaultValues();
});

inputDay.addEventListener('input', function() {

    if(numbersOnlyTwoDigits.test(this.value)) {
        day = this.value;
    } else {
        this.value = day;
    }

});

inputMonth.addEventListener('input', function() {

    if(numbersOnlyTwoDigits.test(this.value)) {
        month = parseInt(this.value);
    } else {
        this.value = month;
    }

});

inputYear.addEventListener('input', function() {

    if(numbersOnlyFourDigits.test(this.value)) {
        year = parseInt(this.value);
    } else {
        this.value = year;
    }

});

button.addEventListener('click', function() {

    calculateDate();

});

