// Dummy Data for Members
let members = [
    { sno: 1, name: "John Doe", admissionNo: "A12345", mobileNo: "9876543210", email: "john@example.com", course: "B.Tech", year: "1", status: "active" },
    { sno: 2, name: "Jane Smith", admissionNo: "A12346", mobileNo: "9876543211", email: "jane@example.com", course: "B.Tech", year: "2", status: "inactive" },
];

const memberTableBody = document.getElementById('memberTableBody');
const addMemberForm = document.getElementById('addMemberForm');

/**
 * Populates the member table with data.
 * @param {Array} data - An array of member objects.
 */
function populateTable(data) {
    memberTableBody.innerHTML = '';
    data.forEach(member => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.sno}</td>
            <td>${member.name}</td>
            <td>${member.admissionNo}</td>
            <td>${member.mobileNo}</td>
            <td>${member.email}</td>
            <td>${member.course}</td>
            <td>${member.year}</td>
            <td>${member.status}</td>
        `;
        memberTableBody.appendChild(row);
    });
}

/**
 * Filters members based on user input.
 */
function searchAndFilter() {
    const filterAttribute = document.getElementById('filterAttribute').value;
    const searchValue = document.getElementById('searchValue').value.toLowerCase();

    const filteredMembers = members.filter(member => {
        if (!filterAttribute || !searchValue) return true;
        return member[filterAttribute] ? member[filterAttribute].toString().toLowerCase().includes(searchValue) : false;
    });

    populateTable(filteredMembers);
}

// Event listener for the "Add Member" form
addMemberForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const newMember = {
        sno: members.length > 0 ? Math.max(...members.map(m => m.sno)) + 1 : 1,
        name: document.getElementById('name').value,
        admissionNo: document.getElementById('admissionNo').value,
        mobileNo: document.getElementById('mobileNo').value,
        email: document.getElementById('email').value,
        course: document.getElementById('course').value,
        year: document.getElementById('year').value,
        status: 'active' // Default status
    };

    members.push(newMember);
    populateTable(members);
    addMemberForm.reset();
    toggleAddForm('.add-form-section');
});

// Initial population of the table
populateTable(members);
