export function projectEventListeners() {
    document.addEventListener('click', function(event) {
        const project = event.target.closest('.project');
        if (!project) return;
        const url = project.dataset.url;
        window.location.href = url;
    });
}