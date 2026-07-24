document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize AOS (Animate On Scroll)
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // 2. Hide Loader on Page Load
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 500);
    });

    // 3. Falling Petals Generator
    const petalsContainer = document.getElementById("petals");
    function createPetal() {
        if (!petalsContainer) return;
        const petal = document.createElement("div");
        petal.classList.add("petal");

        // Randomize petal sizing and position
        const size = Math.random() * 10 + 10; // 10px - 20px
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}vw`;

        // Randomize duration and delay
        const duration = Math.random() * 5 + 5; // 5s - 10s
        petal.style.animationDuration = `${duration}s`;

        petalsContainer.appendChild(petal);

        // Remove petal after animation completes
        setTimeout(() => {
            petal.remove();
        }, duration * 1000);
    }
    // Generate a petal every 400ms
    setInterval(createPetal, 400);

    // 4. Background Music Toggle
    const musicBtn = document.getElementById("music-btn");
    const music = document.getElementById("music");

    if (musicBtn && music) {
        musicBtn.addEventListener("click", () => {
            if (music.paused) {
                music.play().then(() => {
                    musicBtn.classList.add("playing");
                }).catch(err => console.log("Audio playback blocked: ", err));
            } else {
                music.pause();
                musicBtn.classList.remove("playing");
            }
        });
    }

    // 5. Countdown Timer
    const weddingDate = new Date("February 15, 2027 10:30:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = weddingDate - now;

        const daysElem = document.getElementById("days");
        const hoursElem = document.getElementById("hours");
        const minutesElem = document.getElementById("minutes");
        const secondsElem = document.getElementById("seconds");

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (daysElem) daysElem.innerText = days < 10 ? `0${days}` : days;
            if (hoursElem) hoursElem.innerText = hours < 10 ? `0${hours}` : hours;
            if (minutesElem) minutesElem.innerText = minutes < 10 ? `0${minutes}` : minutes;
            if (secondsElem) secondsElem.innerText = seconds < 10 ? `0${seconds}` : seconds;
        } else {
            if (daysElem) daysElem.innerText = "00";
            if (hoursElem) hoursElem.innerText = "00";
            if (minutesElem) minutesElem.innerText = "00";
            if (secondsElem) secondsElem.innerText = "00";
        }
    }

    // Run immediately and update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
});