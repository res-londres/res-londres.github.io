const items = document.querySelectorAll('.accordion-item')

items.forEach(item => {
    item.addEventListener('click', function() {
        const content = item.querySelector('.accordion-content')
        const icon = item.querySelector('.accordion-icon');

        const isOpen = content.classList.contains('open');

        document.querySelectorAll('.accordion-content').forEach(c => {
            c.classList.remove('open');
            c.style.maxHeight = '0'; // Reset height
            c.closest('.accordion-item').classList.remove('active');
        });

        document.querySelectorAll('.accordion-icon').forEach(img => {
            img.src = './assets/images/icon-plus.svg';
            img.alt = 'expand';
        });

        if (!isOpen) {
            content.classList.add('open');
            content.style.maxHeight = content.scrollHeight + 'px';
            item.classList.add('active');
            icon.src = './assets/images/icon-minus.svg';
            icon.alt = 'collapse';
        }
    });
});