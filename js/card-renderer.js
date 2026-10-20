

export async function renderProjectList(container, limit = null) {
    const res = await fetch('/json/projects.json');
    const data = await res.json();
    const projects = limit !== null ? data.slice(-limit) : data;

    container.innerHTML = '';
    projects.forEach(function(project) {
        const card = createProjectCard(project);
        container.insertAdjacentHTML('beforeend', card);
    });
}

function createProjectCard(project) {
    return `
        <div class="project" id="${project.id}">
            <div>
                <div class="project__header">
                    <p class="project__title">${project.title}</p>
                    <p class="project__date">${project.date}</p>
                </div>
                <p class="project__desc">${project.desc}</p>
            </div>
            <div class="project__footer">
                <div class="project__tags">
                    ${project.tags.map(tag => `<span class="tag tag--${tag}">${tag.toUpperCase()}</span>`).join('')}
                </div>
                <a class="project__link" href=${project.link}>Page ⇁</a>
            </div>
        </div>
    `;
}