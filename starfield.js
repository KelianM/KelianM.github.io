/**
 * Endless Sky style starfield: layered stars that drift as you scroll.
 * Purely decorative. Only redraws while scrolling or resizing, never idles
 * in an animation loop.
 */
(function () {
    const canvas = document.querySelector('.starfield');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Three parallax layers: far/dim through near/bright.
    const LAYERS = [
        { count: 190, size: [0.4, 0.9], alpha: [0.25, 0.50], depth: 0.05, tint: '#9fb4d4', halo: false },
        { count: 110, size: [0.7, 1.4], alpha: [0.35, 0.70], depth: 0.13, tint: '#cfe0f5', halo: false },
        { count: 40,  size: [1.1, 2.0], alpha: [0.55, 0.95], depth: 0.26, tint: '#ffffff', halo: true  }
    ];

    let stars = [];
    let width = 0;
    let height = 0;
    let fieldHeight = 0;
    let pending = false;

    const rand = (min, max) => min + Math.random() * (max - min);

    function build() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        // The field is taller than the viewport so parallax has somewhere to go.
        fieldHeight = height * 2;

        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const scale = (width * fieldHeight) / (1440 * 1600);
        stars = [];

        for (const layer of LAYERS) {
            const count = Math.max(Math.round(layer.count * scale), 15);
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * fieldHeight,
                    r: rand(layer.size[0], layer.size[1]),
                    a: rand(layer.alpha[0], layer.alpha[1]),
                    depth: reduceMotion ? 0 : layer.depth,
                    tint: layer.tint,
                    halo: layer.halo
                });
            }
        }
    }

    function draw() {
        pending = false;
        ctx.clearRect(0, 0, width, height);

        const scroll = window.scrollY || 0;

        for (const star of stars) {
            let y = star.y - scroll * star.depth;
            y = ((y % fieldHeight) + fieldHeight) % fieldHeight;
            if (y > height + 4) continue;

            ctx.globalAlpha = star.a;
            ctx.fillStyle = star.tint;
            ctx.beginPath();
            ctx.arc(star.x, y, star.r, 0, Math.PI * 2);
            ctx.fill();

            // A soft halo on the nearest, brightest stars only.
            if (star.halo) {
                ctx.globalAlpha = star.a * 0.14;
                ctx.beginPath();
                ctx.arc(star.x, y, star.r * 4, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.globalAlpha = 1;
    }

    function requestDraw() {
        if (pending) return;
        pending = true;
        window.requestAnimationFrame(draw);
    }

    build();
    draw();

    if (!reduceMotion) {
        window.addEventListener('scroll', requestDraw, { passive: true });
    }

    let resizeTimer = null;
    window.addEventListener('resize', () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
            build();
            draw();
        }, 150);
    });
})();
