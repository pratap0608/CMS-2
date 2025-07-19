// Dummy Data for Meetings
let meetings = [
    { id: 1, topic: "Project Kickoff", description: "Discuss project goals and timelines.", dateTime: "2023-10-25T10:00", completed: false },
    { id: 2, topic: "Budget Review", description: "Review and finalize the project budget.", dateTime: "2023-10-26T14:00", completed: true },
];

const meetingTableBody = document.getElementById('meetingTableBody');
const addMeetingForm = document.getElementById('addMeetingForm');

/**
 * Populates the meeting table with data.
 * @param {Array} data - An array of meeting objects.
 */
function populateMeetingTable(data) {
    meetingTableBody.innerHTML = '';
    data.forEach(meeting => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="${meeting.completed ? 'completed' : ''}">${meeting.topic}</td>
            <td class="${meeting.completed ? 'completed' : ''}">${meeting.description}</td>
            <td class="${meeting.completed ? 'completed' : ''}">${new Date(meeting.dateTime).toLocaleString()}</td>
            <td>${meeting.completed ? 'Completed' : 'Pending'}</td>
            <td class="action-buttons">
                ${!meeting.completed ? `<button class="action-btn complete-btn" onclick="markComplete(${meeting.id})">Complete</button>` : ''}
                <button class="action-btn delete-btn" onclick="deleteMeeting(${meeting.id})">Delete</button>
                <button class="action-btn reschedule-btn" onclick="rescheduleMeeting(${meeting.id})">Reschedule</button>
            </td>
        `;
        meetingTableBody.appendChild(row);
    });
}

function markComplete(meetingId) {
    const meeting = meetings.find(m => m.id === meetingId);
    if (meeting) {
        meeting.completed = true;
        populateMeetingTable(meetings);
    }
}

function deleteMeeting(meetingId) {
    if (confirm("Are you sure you want to delete this meeting?")) {
        meetings = meetings.filter(m => m.id !== meetingId);
        populateMeetingTable(meetings);
    }
}

function rescheduleMeeting(meetingId) {
    const newDateTime = prompt("Enter new date and time (YYYY-MM-DDTHH:MM):");
    if (newDateTime) {
        const meeting = meetings.find(m => m.id === meetingId);
        if (meeting && new Date(newDateTime) > new Date()) {
            meeting.dateTime = newDateTime;
            meeting.completed = false; // Mark as pending again
            populateMeetingTable(meetings);
        } else {
            alert("Invalid date. Please choose a future date and time.");
        }
    }
}

function searchAndFilter() {
    const filterAttribute = document.getElementById('filterAttribute').value;
    const searchValue = document.getElementById('searchValue').value.toLowerCase();

    const filteredMeetings = meetings.filter(meeting => {
        if (!filterAttribute || !searchValue) return true;
        if (filterAttribute === "completed") {
            return String(meeting.completed).includes(searchValue);
        }
        return meeting[filterAttribute] ? meeting[filterAttribute].toString().toLowerCase().includes(searchValue) : false;
    });

    populateMeetingTable(filteredMeetings);
}

addMeetingForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const newMeeting = {
        id: meetings.length > 0 ? Math.max(...meetings.map(m => m.id)) + 1 : 1,
        topic: document.getElementById('meetingTopic').value,
        description: document.getElementById('meetingDescription').value,
        dateTime: document.getElementById('meetingDateTime').value,
        completed: false,
    };
    meetings.push(newMeeting);
    populateMeetingTable(meetings);
    addMeetingForm.reset();
    toggleAddForm('.add-form-section');
});

populateMeetingTable(meetings);
