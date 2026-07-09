// Touch / click support for mega menu
(function () {
    const items = Array.from(document.querySelectorAll('.nav-menu .mega, .nav-menu .dropdown'));
    if (!items.length) return;

    items.forEach(item => {
        const anchor = item.querySelector(':scope > a');
        if (!anchor) return;
        anchor.addEventListener('click', function (e) {
            // toggle open state for touch/click devices
            e.preventDefault();
            item.classList.toggle('open');
        });
    });

    // Close when clicking outside any open menu
    document.addEventListener('click', function (e) {
        items.forEach(item => {
            if (!item.classList.contains('open')) return;
            if (!item.contains(e.target)) item.classList.remove('open');
        });
    });
})();
