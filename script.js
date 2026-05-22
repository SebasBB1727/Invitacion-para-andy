document.addEventListener("DOMContentLoaded", () => {
    // 1. Lógica del Scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // El 30% del elemento debe ser visible para disparar la animación
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase que activa la transición en CSS
                entry.target.classList.add('active');
                // Opcional: deja de observar una vez que ya apareció
                // observer.unobserve(entry.target); 
            } else {
                // Quita la clase si quieres que la animación se repita al subir y bajar
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    // Selecciona todos los elementos con la clase 'reveal' y los observa
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));


    // 2. Lógica de la Música
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerText = "🎵 Toca para la música";
        } else {
            bgMusic.play();
            musicBtn.innerText = "🔇 Pausar música";
        }
        isPlaying = !isPlaying;
    });
});