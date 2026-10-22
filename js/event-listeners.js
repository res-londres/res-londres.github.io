export function clickEventListeners() {
    document.addEventListener('click', function(event) {
        const actionElement = event.target.closest('[data-action]');

        event.stopPropagation();
        if (actionElement) {
            const action = actionElement.dataset.action;

            switch (action) {
                case 'gotoProjectURL':
                    gotoProjectURL(actionElement);
                    break;
                case 'openNewsModal':
                    openModal(actionElement, 'news');
                    break;
                case 'openBlogModal':
                    openModal(actionElement, 'blog');
                    break;
                case 'closeModal':
                    closeModal();
                    break;
            }
        }
    });
}

/* -------- TODO: move all these; these functions dont belong here -------- */
function gotoProjectURL(project) {
    const url = project.dataset.url;
    window.location.href = url;
} 

async function openModal(element, type) {
    const jsonPath = element.dataset.jsonpath;
    const res = await fetch(jsonPath);
    let data = await res.json();
    if (data.length < 1) return;
    const item = data.find(obj => obj.id === element.id);
    const modalContentContainer = document.getElementById('modal__content');
    modalContentContainer.innerHTML = createModalContent(item, type);
    document.getElementById('modal').style.display = 'flex';
}

function createModalContent(item, type) {
    console.log(item.tags.length);
    const tags = item.tags.length
        ? `<div class="modal__tags">
               ${item.tags.map(tag => `<span class="tag tag--${type}">${tag.toUpperCase()}</span>`).join('')}
           </div>`
        : '';

    return `
        <div class="modal__header">
            <div class="modal__top-row">
                <span class="modal__type">${type.toUpperCase()}</span>
                <span class="modal__close" data-action="closeModal">
                    <i class="fa-solid fa-xmark"></i>
                </span>
            </div>
            <span class="modal__title">${item.title}</span>
            <span class="modal__date">${item.date}</span>
            ${tags}
        </div>
        <div class="modal__body">${item.body}</div>
    `;
}

function closeModal() {
    document.getElementById('modal').style.display = '';
    document.getElementById('modal__content').innerHTML = '';
}