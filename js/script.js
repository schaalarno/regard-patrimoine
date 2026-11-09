const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const projectTrack = document.querySelector('.project-track');
const projectCards = document.querySelectorAll('.project-card');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

if (projectTrack && projectCards.length) {
  let currentIndex = 0;

  const getCardWidth = () => {
    const card = projectCards[0];
    const gap = 24;
    return card.getBoundingClientRect().width + gap;
  };

  const updateTrack = () => {
    const offset = currentIndex * getCardWidth();
    projectTrack.style.transform = `translateX(-${offset}px)`;
  };

  prevBtn?.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateTrack();
  });

  nextBtn?.addEventListener('click', () => {
    currentIndex = Math.min(projectCards.length - 1, currentIndex + 1);
    updateTrack();
  });

  window.addEventListener('resize', updateTrack);
  updateTrack();
}
