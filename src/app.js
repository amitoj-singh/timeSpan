const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

const form = document.querySelector(".diff-form");
const result = document.querySelector(".result");
const popContainer = document.querySelector(".pop-container");

//adding event listener to initialize Date when page is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get current date in GMT
    var d = new Date();

    // Create Date object in IST using 'd'
    var dateIST = new Date(d.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

    // Set the date values to input boxes
    document.getElementById("ref-year").value = dateIST.getFullYear();
    document.getElementById('ref-month').value = dateIST.getMonth() + 1;
    document.getElementById('ref-day').value = dateIST.getDate();
    document.getElementById('ref-hours').value = dateIST.getHours();
    document.getElementById('ref-minutes').value = dateIST.getMinutes();
    document.getElementById('ref-seconds').value = dateIST.getSeconds();
});

form.addEventListener('submit', function(e) {
    // prevents default behaviour of form submission
    e.preventDefault();

    // Get the date values for current date
    const refYear = parseInt(document.getElementById("ref-year").value);
    const refMonth = parseInt(document.getElementById('ref-month').value);
    const refDay = parseInt(document.getElementById('ref-day').value);
    const refHour = parseInt(document.getElementById('ref-hours').value);
    const refMinute = parseInt(document.getElementById('ref-minutes').value);
    const refSecond = parseInt(document.getElementById('ref-seconds').value);
    // Values to be added in the time
    const days = parseInt(document.getElementById("days").value) || 0;
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const minutes = parseInt(document.getElementById("minutes").value) || 0;

    let curDate = new Date(refYear, refMonth - 1, refDay, refHour, refMinute, refSecond);
    let curTime = curDate.getTime();
    let milisec = (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);

    // Calculate future time and date
    let futureTime = curTime + milisec;
    let futureDate = new Date(futureTime);

    let resultStr = getDisplayDate(curDate, futureDate);
    result.innerHTML = resultStr;

    popContainer.classList.add('show-result');

    // Returns the tempalate string for result date-time
    function getDisplayDate(curDate, datum) {
        return `<i class="far fa-times-circle close" onclick="hidePopContainer()"></i>
        <p>${format(days)} days ${format(hours)} hours ${format(minutes)} mins from ${curDate.getFullYear()}, ${months[curDate.getMonth()]} ${format(curDate.getDate())}, ${format(curDate.getHours())}:${format(curDate.getMinutes())} will be <br>
        <span class="future-date">${datum.getFullYear()}, ${months[datum.getMonth()]} ${format(datum.getDate())}, ${format(datum.getHours())}:${format(datum.getMinutes())}</span>
    </p>`;
    }
});

document.addEventListener("keydown", function(evt) {
    if (evt.key === "Escape") {
        hidePopContainer();
    }
});

const close = document.querySelector(".close");

const hidePopContainer = () => {
    popContainer.classList.remove('show-result');
};

function format(value) {
    if (value < 10)
        return `0${value}`;
    return value;
}
