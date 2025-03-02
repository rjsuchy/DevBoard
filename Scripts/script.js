//log task completion
function logCompletion(element, taskTitle) {
  const activityLog = document.getElementById('activityLog');
  
   // current time & convert to UTC+6
  const currentTime = new Date();
  const utc6Time = new Date(currentTime.getTime() + 6 * 60 * 60 * 1000);
  
  // Format time - 12-hour format with AM/PM
  const hours = utc6Time.getUTCHours() % 12 || 12; // Convert to 12-hour format
  const minutes = String(utc6Time.getUTCMinutes()).padStart(2, '0');
  const seconds = String(utc6Time.getUTCSeconds()).padStart(2, '0');
  const ampm = utc6Time.getUTCHours() >= 12 ? 'PM' : 'AM';
  const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;

  // log message
  const logMessage = `You have completed ${taskTitle} at ${formattedTime}`;
  
  // new log entry
  const logEntry = document.createElement('div');
  logEntry.className = 'bg-blue-100 p-2 rounded-lg';
  logEntry.innerHTML = `<span class="text-gray-800">${logMessage}</span>`;
  
  // log entry to activity log
  activityLog.appendChild(logEntry);

  // Update task counters
  updateTaskCounters();

  // success message
  alert("Board Updated Successfully");

  // completed button
  disableButton(element);

  // Check  all tasks are done
  checkAllTasksCompleted();
}

//updating task counters
function updateTaskCounters() {
  const taskAssigned = document.getElementById('assignedTask');
  let taskCount = parseInt(taskAssigned.textContent);
  
  // Decrease tasks
  if (taskCount > 0) {
      taskAssigned.textContent = taskCount - 1;
  }

  // Increase completed tasks
  const taskCountElement = document.getElementById('countTask');
  taskCountElement.textContent = parseInt(taskCountElement.textContent) + 1;
}

//disable completed button
function disableButton(element) {
  element.onclick = null; // Remove click handler
  element.classList.remove('text-white', 'bg-blue-500', 'cursor-pointer');
  element.classList.add('bg-blue-500', 'opacity-20');
}

//check if all tasks are completed
function checkAllTasksCompleted() {
  const taskAssigned = document.getElementById('assignedTask');
  if (parseInt(taskAssigned.textContent) === 0) {
      alert("Congrats!!! You have completed all the current tasks");
  }
}

//clear all activity log entries
function clearHistory() {
  const activityLog = document.getElementById('activityLog');
  activityLog.innerHTML = ''; // Remove all child elements
}

//background color change to random color
function changeBackgroundColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

// displayed date to current UTC+6 time
function updateCurrentDate() {
  const currentDateElement = document.getElementById('current-date');
  const now = new Date();
  const utc6Time = new Date(now.getTime() + 6 * 60 * 60 * 1000); // Add 6 hours
  
  // Date formatting
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // Build date string
  const dayName = days[utc6Time.getUTCDay()];
  const monthName = months[utc6Time.getUTCMonth()];
  const dayNumber = utc6Time.getUTCDate();
  const year = utc6Time.getUTCFullYear();
  
  // date display Update 
  currentDateElement.textContent = `${dayName}, ${monthName} ${dayNumber} ${year}`;
}

// initial date & update daily
window.onload = function() {
  updateCurrentDate(); // initial date
  setInterval(updateCurrentDate, 24 * 60 * 60 * 1000); // daily updated
};