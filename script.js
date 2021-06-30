const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countDownForm');
const dateEl = document.getElementById('date-picker');

// Set Date Input min with today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);
