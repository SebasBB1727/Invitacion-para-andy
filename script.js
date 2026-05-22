document.addEventListener("DOMContentLoaded", () => {
    // === 1. DECLARACIÓN ÚNICA DE VARIABLES ===
    // Se declaran todas las referencias al DOM al inicio para mantener el orden y evitar colisiones.
    const introScreen = document.getElementById('intro-screen');
    const startBtn = document.getElementById('start-btn');
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');

    // Estado global de la música
    let isPlaying = false;

    // === 2. LÓGICA DE LA PANTALLA DE INICIO (SPLASH SCREEN) ===
    startBtn.addEventListener('click', () => {
        // Iniciar la música
        bgMusic.play().catch(err => console.log("Error al reproducir audio:", err));
        isPlaying = true;
        musicBtn.innerText = "🔇 Pausar música";

        // Disparar la animación de zoom en la pantalla morada
        introScreen.classList.add('zoom-out-animation');

        // Remover la capa del DOM después de la animación para permitir el scroll
        // El tiempo (1500ms) coincide con la transición CSS
        setTimeout(() => {
            introScreen.style.display = 'none';
        }, 1500);
    });

    // === 3. LÓGICA DEL BOTÓN FLOTANTE DE MÚSICA ===
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerText = "Toca aqui 🎵";
        } else {
            bgMusic.play();
            musicBtn.innerText = "🔇 Pausar música";
        }
        isPlaying = !isPlaying;
    });

    // === 4. LÓGICA DEL SCROLL (INTERSECTION OBSERVER) ===
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // === 5. LÓGICA DE LA CUENTA REGRESIVA ===
    const countdownElement = document.getElementById('countdown-display');
    if (countdownElement) {
        // Configuramos la fecha objetivo: Mañana a las 13:00 (1:00 PM)
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 1); // Suma 1 día (mañana)
        targetDate.setHours(13, 0, 0, 0); // Fija la hora a las 13:00:00

        // Inicia un bucle que se ejecuta cada 1000 milisegundos
        const updateTimer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            // Si el tiempo se agota, detenemos el temporizador y mostramos un mensaje
            if (distance < 0) {
                clearInterval(updateTimer);
                countdownElement.innerHTML = "¡Ya estamos en el aire!";
                return;
            }

            // Cálculos matemáticos para convertir milisegundos en unidades de tiempo
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Formateo para asegurar que siempre haya dos dígitos (ej. 09 en lugar de 9)
            const displayHours = hours.toString().padStart(2, '0');
            const displayMinutes = minutes.toString().padStart(2, '0');
            const displaySeconds = seconds.toString().padStart(2, '0');

            // Actualización del DOM
            countdownElement.innerHTML = `${displayHours}h : ${displayMinutes}m : ${displaySeconds}s`;
        }, 1000);
    }
});