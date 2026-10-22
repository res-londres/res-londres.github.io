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
                    break;
                case 'openBlogModal':
                    break;
            }
        }
    });
}

/* TODO: move this, this function doesnt belong here */
function gotoProjectURL(project) {
    const url = project.dataset.url;
    window.location.href = url;
} 