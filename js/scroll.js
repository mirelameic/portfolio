function handleScroll() {
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 120) {
        header.classList.add('scrolled');
        hero.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
        hero.classList.remove('scrolled');
    }
}
