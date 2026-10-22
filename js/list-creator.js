export function createProjectCard(project) {
    return `
        <div class="project card" id="${project.id}" data-url="${project.url}">
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
            </div>
        </div>
    `;
}

export function createNewsStrip(news) {
    const newsPreview = news.body.length > 500 ? news.body.slice(0, 300) + '...' : news.body;
    return `
        <div class="news strip" id="${news.id}">
            <div>
                <div class="news__header">
                    <p class="news__headline">${news.headline}</p>
                    <p class="news__date">${news.date}</p>
                </div>
                <p class="news__body">${newsPreview}</p>
            </div>
            <div class="news__footer">
                <div class="news__tags">
                    ${news.tags.map(tag => `<span class="tag tag--news">${tag.toUpperCase()}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

export function createBlogStrip(blog) {
    const blogPreview  = blog.body.length > 500 ? blog.body.slice(0, 300) + '...' : blog.body;
    return `
        <div class="blog strip" id="${blog.id}">
            <div>
                <div class="blog__header">
                    <p class="blog__title">${blog.title}</p>
                    <p class="blog__date">${blog.date}</p>
                </div>
                <p class="blog__body">${blogPreview}</p>
            </div>
            <div class="blog__footer">
                <div class="blog__tags">
                    ${blog.tags.map(tag => `<span class="tag tag--blog">${tag.toUpperCase()}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}