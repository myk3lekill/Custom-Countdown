//DOM
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');//select all the span elements and return an array of elements

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';

let countdownValue = new Date();

let countdownActive;

let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


//Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
console.log('today\'s date', today)
dateEl.setAttribute('min', today)

//Populate Countdown
function updateDom() {
    //set interval to update countdown every 1 second
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        //console.log('distance', distance);

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        console.log(days, hours, minutes, seconds);

        //Hide input
        inputContainer.hidden = true;
        
        //If the countown has ended, show complete
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
            completeEl.hidden = false;
        } else {
            //Show countdon in progress
            //Populate countdown
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            //Show countdown
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, second)
}

//Take values from from input
function updateCountdown(e) {
    e.preventDefault(); //preventDefault method prevent the refresh of the page at submit's press
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    //console.log(countdownTitle, countdownDate)
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    };
    //console.log(savedCountdown)
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));//convert object into a string to local storage purpose
    //Check for valid date
    if (countdownDate === '') {
        alert('Please select a date for the countdown');
    } else {
        //Get the numbre version of current Date, update DOM
        countdownValue = new Date(countdownDate).getTime(); //store the time between the countdownDate and 1st o1 1970
        console.log('countdown value', countdownValue)
        updateDom();
    }
}

//Reset all values
function reset() {
    //Hide countdown and show input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    //Stop the countdown
    clearInterval(countdownActive);
    //Reset the values
    countdownTitle = '';
    countdownDate = '';
    console.log('reset button pressed');
    localStorage.removeItem('countdown');
    //Update countdown at reset
    updateCountdown()
}

//restore the previous countdown on refresh
function restorePreviousCountodown() {
    //Get countdown from local Storage if available
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDom();
    }
}

//Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

//On Load, check local storage
restorePreviousCountodown();