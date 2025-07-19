// Dummy data for reports - in a real app, this would come from a server
let reports = JSON.parse(localStorage.getItem('reports')) || [];

// Get references to DOM elements
const projectReportTable = document.getElementById('projectReportTable');
const weeklyClubReportTable = document.getElementById('weeklyClubReportTable');
const monthlyClubReportTable = document.getElementById('monthlyClubReportTable');
const progressReportTable = document.getElementById('progressReportTable');
const addReportForm = document.getElementById('addReportForm');
const toggleFormButton = document.getElementById('toggleFormButton');
const searchInput = document.getElementById('searchInput');
const filterType = document.getElementById('filterType');

/**
 * Renders the report rows into their respective tables.
 * @param {Array} data - The array of report objects to render.
 */
function generateReportRows(data) {
    // Clear existing rows to prevent duplicates
    projectReportTable.innerHTML = '';
    weeklyClubReportTable.innerHTML = '';
    monthlyClubReportTable.innerHTML = '';
    progressReportTable.innerHTML = '';

    data.forEach((report, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${report.title}</td>
            <td>${report.date}</td>
        `;
        // Add a click event to show report details
        row.onclick = () => showReportContent(report.title);

        // Place the row in the correct table based on its type
        switch (report.type) {
            case 'project':
                projectReportTable.appendChild(row);
                break;
            case 'weekly':
                weeklyClubReportTable.appendChild(row);
                break;
            case 'monthly':
                monthlyClubReportTable.appendChild(row);
                break;
            case 'progress':
                progressReportTable.appendChild(row);
                break;
        }
    });
}

/**
 * Shows the content of a specific report in an alert.
 * @param {string} reportTitle - The title of the report to show.
 */
function showReportContent(reportTitle) {
    const report = reports.find(r => r.title === reportTitle);
    if (report) {
        alert(`Report Content:\n\nTitle: ${report.title}\nDescription: ${report.description}\nDate: ${report.date}`);
    }
}

/**
 * Filters reports based on the search and filter dropdowns.
 */
function filterReports() {
    const searchTerm = searchInput.value.toLowerCase();
    const type = filterType.value;

    const filteredReports = reports.filter(report => {
        const matchesSearch = report.title.toLowerCase().includes(searchTerm) ||
                              report.date.includes(searchTerm) ||
                              report.type.toLowerCase().includes(searchTerm);
        
        const matchesType = type === 'all' || report.type === type;

        return matchesSearch && matchesType;
    });

    generateReportRows(filteredReports);
}

// Event listener for adding a new report via the form
addReportForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const newReport = {
        type: document.getElementById('reportType').value,
        title: document.getElementById('reportTitle').value,
        description: document.getElementById('reportDescription').value,
        date: document.getElementById('reportDate').value,
    };

    reports.push(newReport);
    localStorage.setItem('reports', JSON.stringify(reports)); // Save to local storage

    addReportForm.reset();
    document.getElementById('reportFormContainer').style.display = 'none';
    generateReportRows(reports); // Re-render the table with all reports
});

// Event listener for the "Add New Report" button to toggle the form
toggleFormButton.addEventListener('click', function () {
    const formContainer = document.getElementById('reportFormContainer');
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
});

// Function to be called by the "Cancel" button inside the form
function closeForm() {
    document.getElementById('reportFormContainer').style.display = 'none';
}

// Add event listeners for live filtering as the user types or selects
searchInput.addEventListener('input', filterReports);
filterType.addEventListener('change', filterReports);

// Initial render of all reports when the page loads
generateReportRows(reports);
