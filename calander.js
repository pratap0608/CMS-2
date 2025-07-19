// Initialize current date and load events from local storage
let currentDate = new Date();
let events = JSON.parse(localStorage.getItem('events')) || [
    { type: "event", name: "Team Meeting", description: "Discuss project updates", date: "2023-10-15", time: "10:00" },
    { type: "task", name: "Submit Report", description: "Finalize and submit the quarterly report", date: "2023-10-20", time: "14:00" },
];

// DOM element references
const calendarElement = document.querySelector('.calendar');
const calendarHeader = document.querySelector('.calendar-header');
const addEventForm = document.getElementById('addEventForm');

/**
 * Generates and displays the calendar for the currently selected month.
 */
function generateCalendar() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    calendarHeader.textContent = `${monthNames[month]} ${year}`;
    calendarElement.innerHTML = ''; // Clear the calendar before redrawing

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add day headers (Sun, Mon, etc.)
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const dayHeaderEl = document.createElement('div');
        dayHeaderEl.className = 'calendar-day header';
        dayHeaderEl.textContent = day;
        calendarElement.appendChild(dayHeaderEl);
    });

    // Add empty cells for days before the month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarElement.appendChild(emptyDay);
    }

    // Add the actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.textContent = day;

        // Highlight today's date
        const today = new Date();
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayEl.classList.add('today');
        }

        // Check for events on this day and display them
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = events.filter(e => e.date === dateStr);

        if (dayEvents.length > 0) {
            const eventsContainer = document.createElement('div');
            eventsContainer.className = 'events';
            dayEvents.forEach(event => {
                const eventEl = document.createElement('div');
                eventEl.className = 'event-indicator';
                eventEl.textContent = event.name;
                eventsContainer.appendChild(eventEl);
            });
            dayEl.appendChild(eventsContainer);
        }
        calendarElement.appendChild(dayEl);
    }
}

// Event listeners for month navigation
document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
});

// Event listener for toggling the add event form
document.getElementById('toggleFormButton').addEventListener('click', function () {
    const formContainer = document.getElementById('eventFormContainer');
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
});

// Function to close the form
function closeForm() {
    document.getElementById('eventFormContainer').style.display = 'none';
}

// Event listener for submitting a new event
addEventForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const eventDateTime = document.getElementById('eventDateTime').value;
    const newEvent = {
        type: document.getElementById('eventType').value,
        name: document.getElementById('eventName').value,
        description: document.getElementById('eventDescription').value,
        date: eventDateTime.split('T')[0], // Extract YYYY-MM-DD
        time: eventDateTime.split('T')[1], // Extract HH:MM
    };

    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));

    addEventForm.reset();
    closeForm();
    generateCalendar(); // Refresh the calendar to show the new event
});

// Initial calendar generation on page load
generateCalendar();
