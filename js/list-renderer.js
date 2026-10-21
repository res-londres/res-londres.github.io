/* -------------------- LIST RENDERER -------------------- */
export async function renderList(container, jsonURL, htmlCreator, limit = null) {
    const res = await fetch(jsonURL);
    let list = await res.json();
    if (list.length < 1) return;
    list = limit !== null ? list.slice(-limit) : list;
    list.reverse();

    container.innerHTML = '';
    list.forEach(function(item) {
        container.insertAdjacentHTML('beforeend', htmlCreator(item));
    });
}

/* -------------------- HTML CREATORS-------------------- */
export function createProjectCard(project) {
    return `
        <div class="project card" id="${project.id}">
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
                <a class="project__link" href=${project.link}>Go To ⇁</a>
            </div>
        </div>
    `;
}

export function createNewsStrip(news, preview = false) {
    const newsBodyPreview = news.body.length > 500 ? news.body.slice(0, 300) + '...' : news.body;
    return `
        <div class="news strip" id="${news.id}">
            <div>
                <div class="news__header">
                    <p class="news__headline">${news.headline}</p>
                    <p class="news__date">${news.date}</p>
                </div>
                <p class="news__body">${newsBodyPreview}</p>
            </div>
            <div class="news__footer">
                <div class="news__tags">
                    ${news.tags.map(tag => `<span class="tag tag--news">${tag.toUpperCase()}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}