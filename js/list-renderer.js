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
