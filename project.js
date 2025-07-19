// Dummy Data for Projects
let projects = [
    { id: 1, name: "Project Alpha", description: "This is the description for Project Alpha.", status: "In Progress", members: ["John Doe", "Jane Smith"] },
    { id: 2, name: "Project Beta", description: "This is the description for Project Beta.", status: "Completed", members: ["Alice Johnson", "Bob Brown"] },
    { id: 3, name: "Project Gamma", description: "This is the description for Project Gamma.", status: "Not Started", members: ["Charlie Davis", "Eve White"] },
];

const projectGrid = document.getElementById('projectGrid');
const addProjectForm = document.getElementById('addProjectForm');

/**
 * Populates the project grid with project cards.
 * @param {Array} data - An array of project objects.
 */
function populateProjectGrid(data) {
    projectGrid.innerHTML = ''; // Clear existing cards
    data.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card fade-in';
        card.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <p><strong>Status:</strong> <span class="status">${project.status}</span></p>
            <p><strong>Working Members:</strong> ${project.members.join(', ')}</p>
        `;
        projectGrid.appendChild(card);
    });
}

/**
 * Filters projects based on user input.
 */
function searchAndFilter() {
    const filterAttribute = document.getElementById('filterAttribute').value;
    const searchValue = document.getElementById('searchValue').value.toLowerCase();

    const filteredProjects = projects.filter(project => {
        if (!filterAttribute || !searchValue) return true;
        // Ensure property exists before searching
        return project[filterAttribute] ? project[filterAttribute].toString().toLowerCase().includes(searchValue) : false;
    });

    populateProjectGrid(filteredProjects);
}

// Event listener for the "Add Project" form
addProjectForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const newProject = {
        id: document.getElementById('projectId').value,
        name: document.getElementById('projectName').value,
        description: document.getElementById('projectDescription').value,
        status: document.getElementById('projectStatus').value,
        members: document.getElementById('workingMembers').value.split(',').map(member => member.trim()),
    };

    projects.push(newProject);
    populateProjectGrid(projects);
    addProjectForm.reset();
    toggleAddForm('.add-form-section');
});

// Initial population of the project grid
populateProjectGrid(projects);
