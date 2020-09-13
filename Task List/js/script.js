let today = new Date();
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let pickaDate = document.querySelector('#pickaDate');
let form = document.querySelector('#form');
let showSelectedDate = document.querySelector('#showSelectedDate');
let addtask = document.querySelector('#addtask');
let tasklist_ul = document.querySelector('ul.list-group');

// Get Today's Date Format to show Date and Weekday
function todaysDate()
{
  let dd = String(today.getDate());
  let mm = String(today.getMonth());
  let yyyy = today.getFullYear();

  return dd + ' ' + months[mm] + ', ' + yyyy + ' (' + weekday[today.getDay()] + ')';
}

/*========================================================================
                            Counter Controller
==========================================================================*/
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
}, 1000);

document.querySelector("#today").innerHTML = todaysDate();

/*========================================================================
                        Form Area Controller
==========================================================================*/
form.style.display = 'none';
// Pick A Date button form
pickaDate.addEventListener('click', function () {
  form.innerHTML = `<div class="row my-3">
                      <div class="col-10"></div>
                      <div class="col-2"></div>
                    </div>`;
  form.children[0].children[0].innerHTML = `<input type="text" class="form-control" placeholder="Select A Date" id="datepicker">`;
  form.children[0].children[1].innerHTML = `<button class="btn btn-primary" id="search">Search</button>`;
  document.querySelector('#search').addEventListener('click', function (e) {
    showSelectedDate.textContent = document.querySelector('#datepicker').value;
    form.style.display = 'none';
    e.preventDefault();
    viewtasklist();
  });
  viewtasklist();
  form.style.display = 'block';
});

// Add Task Button Form
addtask.addEventListener('click', function () {
  form.innerHTML = `<div class="row my-3">
                      <div class="col-10"></div>
                      <div class="col-2"></div>
                    </div>`;
  form.children[0].children[0].innerHTML = `<input type="text" class="form-control" placeholder="Add A Task" id="task">`;
  form.children[0].children[1].innerHTML = `<button class="btn btn-success" id="search">Add Task</button>`;
  let selectedDate = showSelectedDate.textContent;
  if (selectedDate === "None") {
    // Alert: User Can't Add Task without selecting a Date
    document.querySelector('#search').addEventListener('click', function (e) {
      form.style.display = 'none';
      alert("You have to Pick A Date First.");
      e.preventDefault();
    });
  } else {
    // Store to local Storage After clicking Add Button
    document.querySelector('#search').addEventListener('click', function (e) {
      let task = document.querySelector('#task').value;
      let tasks;
      let taskFlag;
      if (localStorage.getItem(selectedDate) === null) {
        tasks = [];
        taskFlag = [];
      } else {
        tasks = JSON.parse(localStorage.getItem(selectedDate));
        taskFlag = JSON.parse(localStorage.getItem(selectedDate + 'flag'));
      }
      tasks.push(task);
      taskFlag.push(false);
      localStorage.setItem(selectedDate, JSON.stringify(tasks));
      localStorage.setItem(selectedDate + 'flag', JSON.stringify(taskFlag));
      form.style.display = 'none';
      // viewtasklist();
      alert("Task Added Successfully.");
      viewtasklist();
      e.preventDefault();
    });
  }
  form.style.display = 'block';
});

/*========================================================================
              Viewing The Task List from Local Storage
==========================================================================*/
function viewtasklist() {
  let selectedDate = showSelectedDate.textContent;
  if (selectedDate === 'None') {
    // console.log(todaysDate().replace(/[^0-9\.]+/g, ""););
  }
  let tasks;
  let tasklist = '';
  if (localStorage.getItem(selectedDate) === null) {
    tasks = [];
    taskFlag = [];
  } else {
    tasks = JSON.parse(localStorage.getItem(selectedDate));
    taskFlag = JSON.parse(localStorage.getItem(selectedDate + 'flag'));
  }
  if (tasks.length === 0) {
    tasklist = `<h3 class="border rounded text-danger p-5 text-center bg-white">You Have No Task In This Day</h3>`;
  } else {
    for (let i = 0; i < tasks.length; i++) {
      let html;
      if (taskFlag[i] === false) {
        html = '<li class="list-group-item">' + tasks[i] + '<span class="badge badge-danger float-right">Incomplete</span></li>';
      } else {
        html = '<li class="list-group-item">' + tasks[i] + '<span class="badge badge-success float-right">Complete</span></li>';
      }
      tasklist += html;
    }
    // Complete / Incomplete Toggle
    document.querySelector('ul').addEventListener('click', function (e) {
      let t;
      if (e.target.children[0].textContent === "Incomplete") {
        t = "Complete"
      }
      else {
        t = "Incomplete"
      }
      e.target.children[0].textContent = t;
      e.target.children[0].classList.toggle("badge-danger");
      e.target.children[0].classList.toggle("badge-success");
    });
  }
  tasklist_ul.innerHTML = tasklist;
}

/*========================================================================
                    Clear Task Button
==========================================================================*/
document.querySelector('#cleartask').addEventListener('click', function () {
  let selectedDate = showSelectedDate.textContent;
  confirm("Are You Sure to Delete All the Task from this date?");
  localStorage.removeItem(selectedDate);
  localStorage.removeItem(selectedDate + 'flag');
  viewtasklist();
});
viewtasklist();