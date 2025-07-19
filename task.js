// Dummy Data for Tasks
// In a real application, this would be fetched from a server.
let tasks = [
    { id: 1, name: "Prepare Agenda", description: "Create the agenda for the next meeting.", assignedTo: "John Doe", completed: false },
    { id: 2, name: "Send Invitations", description: "Send meeting invitations to all participants.", assignedTo: "Jane Smith", completed: true },
    { id: 3, name: "Review Budget", description: "Review and finalize the budget for the project.", assignedTo: "John Doe", completed: false },
];

const taskTableBody = document.getElementById('taskTableBody');
const addTaskForm = document.getElementById('addTaskForm');

/**
 * Populates the task table with data.
 * @param {Array} data - An array of task objects.
 */
function populateTable(data) {
    taskTableBody.innerHTML = ''; // Clear existing rows
    data.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="${task.completed ? 'completed' : ''}">${task.name}</td>
            <td class="${task.completed ? 'completed' : ''}">${task.description}</td>
            <td class="${task.completed ? 'completed' : ''}">${task.assignedTo}</td>
            <td>${task.completed ? 'Completed' : 'Pending'}</td>
            <td>
                <button class="action-btn mark-complete-btn" onclick="toggleComplete(${task.id})">
                    ${task.completed ? 'Unmark' : 'Mark'} Complete
                </button>
            </td>
        `;
        taskTableBody.appendChild(row);
    });
}

/**
 * Toggles the completion status of a task.
 * @param {number} taskId - The ID of the task to toggle.
 */
function toggleComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        populateTable(tasks); // Re-render the table
    }
}

/**
 * Filters the tasks based on user input.
 */
function searchAndFilter() {
    const filterAttribute = document.getElementById('filterAttribute').value;
    const searchValue = document.getElementById('searchValue').value.toLowerCase();

    const filteredTasks = tasks.filter(task => {
        if (!filterAttribute || !searchValue) return true;
        
        if (filterAttribute === "completed") {
            // Allows searching for "true", "false", "completed", "pending"
            const status = task.completed ? "completed" : "pending";
            return status.includes(searchValue) || String(task.completed).includes(searchValue);
        }
        
        // Check if the property exists before calling toString
        return task[filterAttribute] ? task[filterAttribute].toString().toLowerCase().includes(searchValue) : false;
    });

    populateTable(filteredTasks);
}

// Event listener for the "Add Task" form submission
addTaskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1, // Ensure unique ID
        name: document.getElementById('taskName').value,
        description: document.getElementById('taskDescription').value,
        assignedTo: document.getElementById('assignedTo').value,
        completed: false,
    };

    tasks.push(newTask);
    populateTable(tasks);
    addTaskForm.reset(); // Clear the form
    toggleAddForm('.add-form-section'); // Hide form after adding
});

// Initial population of the table when the script loads
populateTable(tasks);
