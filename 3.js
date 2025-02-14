function createHearts() {
    const heartsContainer = document.querySelector(".hearts-container");
    const symbols = ["❤", "🐱", "💖", "😻", "💕", "🐈"]; // Corazones y gatitos
    setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = Math.random() * 20 + 10 + "px";
        heart.style.animationDuration = Math.random() * 5 + 3 + "s";
        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }, 500);
}

function openLetter() {
    document.querySelector(".cover").style.transform = "translateY(-100%)";
    setTimeout(() => {
        document.querySelector(".inside").style.display = "flex";
        document.getElementById("bgMusic").play(); // Inicia la música
        initScratchEffect();
    }, 500);
}

function initScratchEffect() {
    const canvas = document.getElementById("scratchCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 250;
    canvas.height = 100;

    // Capa gris que se "rasca"
    ctx.fillStyle = "#aaa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function scratch(e) {
        const rect = canvas.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
        ctx.clearRect(x - 10, y - 10, 20, 20);
    }

    // Soporte para touch y mouse
    canvas.addEventListener("touchmove", scratch);
    canvas.addEventListener("mousemove", scratch);

    let touches = 0;
    canvas.addEventListener("touchend", () => {
        touches++;
        if (touches >= 3) {
            revealCode();
        }
    });
}

function revealCode() {
    document.querySelector(".hidden-message").style.display = "block";
    copyToClipboard();
}

function copyToClipboard() {
    const giftCode = document.getElementById("giftCode").textContent;
    navigator.clipboard.writeText(giftCode).then(() => {
        document.getElementById("copyMessage").style.display = "block";
    });
}

createHearts();