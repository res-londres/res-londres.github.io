export async function renderList(container, jsonPath, htmlCreator, limit = null) {
    const res = await fetch(jsonPath);
    let list = await res.json();
    if (list.length < 1) return;
    list = limit !== null ? list.slice(-limit) : list;
    list.reverse();

    container.innerHTML = '';
    list.forEach(function(item) {
        container.insertAdjacentHTML('beforeend', htmlCreator(item, jsonPath));
    });
}
