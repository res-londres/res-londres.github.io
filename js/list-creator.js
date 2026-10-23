export function createProjectCard(project, jsonPath) {
    const tags = project.tags.length
        ? `<div class="project__tags">
               ${project.tags.map(tag => `<span class="tag tag--${tag}">${tag.toUpperCase()}</span>`).join('')}
           </div>`
        : '';

    return `
        <div class="project__item card" id="${project.id}" data-url="${project.url}" data-action="gotoProjectURL" data-jsonpath="${jsonPath}">
            <div>
                <div class="project__header">
                    <p class="project__title">${project.title}</p>
                    <p class="project__date">${project.date}</p>
                </div>
                <p class="project__desc">${project.desc}</p>
            </div>
            <div class="project__footer">
                ${tags}
            </div>
        </div>
    `;
}

export function createNewsStrip(news, jsonPath) {
    const newsPreview = news.body.length > 500 ? news.body.slice(0, 300) + '...' : news.body;
    const tags = news.tags.length
        ? `<div class="news__tags">
               ${news.tags.map(tag => `<span class="tag tag--news">${tag.toUpperCase()}</span>`).join('')}
           </div>`
        : '';

    return `
        <div class="news__item strip" id="${news.id}" data-action="openNewsModal" data-jsonpath="${jsonPath}">
            <div>
                <div class="news__header">
                    <p class="news__title">${news.title}</p>
                    <p class="news__date">${news.date}</p>
                </div>
                <p class="news__body">${newsPreview}</p>
            </div>
            <div class="news__footer">
                ${tags}
            </div>
        </div>
    `;
}

export function createBlogStrip(blog, jsonPath) {
    const blogPreview  = blog.body.length > 500 ? blog.body.slice(0, 300) + '...' : blog.body;
    const tags = blog.tags.length
        ? `<div class="blog__tags">
               ${blog.tags.map(tag => `<span class="tag tag--blog">${tag.toUpperCase()}</span>`).join('')}
           </div>`
        : '';

    return `
        <div class="blog__item strip" id="${blog.id}" data-action="openBlogModal" data-jsonpath="${jsonPath}">
            <div>
                <div class="blog__header">
                    <p class="blog__title">${blog.title}</p>
                    <p class="blog__date">${blog.date}</p>
                </div>
                <p class="blog__body">${blogPreview}</p>
            </div>
            <div class="blog__footer">
                ${tags}
            </div>
        </div>
    `;
}