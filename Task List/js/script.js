let today = new Date();
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Get Today's Date Format to show Date and Weekday
function todaysDate()
{
  let dd = String(today.getDate());
  let mm = String(today.getMonth());
  let yyyy = today.getFullYear();

  return dd + ' ' + months[mm] + ', ' + yyyy + ' (' + weekday[today.getDay()] + ')';
}

// Counter Controller
let countDownDate = new Date();
countDownDate.setDate(countDownDate.getDate() + 1);
countDownDate.setHours(0, 0, 0);

// Counter Update in every 1 second
let x = setInterval(function () 
{
  let now = new Date().getTime();
  let distance = countDownDate - now;
  // Time calculations for hours, minutes and seconds
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  // Display the result in the element with id="timer"
  document.getElementById("timer").innerHTML = hours + "h "
    + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
});


document.querySelector("#today").innerHTML = todaysDate();