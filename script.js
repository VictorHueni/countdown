const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');


let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input min with today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Popuilate Countdown / complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second); 
        
        //  Hide Input
        inputContainer.hidden = true;

        // If the countdown has ended, show complete
        if(distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            //Else we wanna show the countdown in progress
            //  Populate Countdown
            countdownTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;

            //  Show Countdown
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
           
    }, second);
}

// Take value from form Input
function updateCountDown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    // Chweck for valid date
    if(countdownDate === ''){
        alert('Please selet a date for the countdown.');
    } else {
        // Get number version of current Date, updateDOM
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }


}

// Reset all Values
function reset() {
    // Hide Countdowns, show input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;

    //Stop the countdown
    clearInterval(countdownActive);

    // Reset Values
    countdownTitle = '';
    countdownDate = '';
}

// Event Listener
countdownForm.addEventListener('submit', updateCountDown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);