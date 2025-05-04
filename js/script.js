const videos = [
    {
        title: "Título",
        thumbnail: "../assets/images/header-vid.jpg",
        videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
        description: "Descrição",
    },
    {
        title: "Título",
        thumbnail: "../assets/images/header-vid.jpg",
        videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
        description: "Descrição",
    },
];

function createPortfolioItems() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    videos.forEach(video => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        
        portfolioItem.innerHTML = `
            <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}">
                <div class="video-overlay">
                    <h3>${video.title}</h3>
                    <p>${video.description}</p>
                    <a href="${video.videoUrl}" target="_blank" class="play-button">
                        <i class="fas fa-play"></i>
                    </a>
                </div>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
    });
}

function handleScroll() {
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        header.classList.add('scrolled');
        hero.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
        hero.classList.remove('scrolled');
    }
}

function init() {
    createPortfolioItems();
    
    // Adiciona smooth scroll para os links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Adiciona o evento de scroll
    window.addEventListener('scroll', handleScroll);
}

// Inicializa o site quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', init); 