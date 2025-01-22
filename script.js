// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    });
});

// Current year in footer
const currentYear = new Date().getFullYear();
document.querySelector('footer p').innerHTML = `&copy; ${currentYear} My Portfolio`;

// Lightbox functionality
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <span class="lightbox-nav lightbox-prev">&#10094;</span>
    <span class="lightbox-nav lightbox-next">&#10095;</span>
    <div class="lightbox-content">
        <img class="lightbox-img" src="" alt="">
    </div>
`;
document.body.appendChild(lightbox);

const galleryItems = document.querySelectorAll('.gallery-item');
let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    const imgSrc = galleryItems[index].querySelector('img').src;
    lightbox.querySelector('.lightbox-img').src = imgSrc;
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

function navigateLightbox(direction) {
    currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
    const imgSrc = galleryItems[currentIndex].querySelector('img').src;
    lightbox.querySelector('.lightbox-img').src = imgSrc;
}

// Event listeners
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => navigateLightbox(1));

document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    }
});
