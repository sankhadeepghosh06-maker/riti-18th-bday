/* =========================================
   ROMANTIC 18TH BIRTHDAY WEBSITE
========================================= */


/* =========================================
   OPENING ANIMATION
========================================= */

const openButton =
    document.getElementById("openButton");

const opening =
    document.getElementById("opening");

const site =
    document.getElementById("site");


openButton.addEventListener("click", () => {

    opening.classList.add("hide");

    setTimeout(() => {
        site.classList.remove("hidden");
    }, 400);

    startParticles();

    createBurst();

});


/* =========================================
   FLOATING HEARTS + PETALS
========================================= */

const particles =
    document.getElementById("particles");


const symbols = [
    "♥",
    "♡",
    "✦",
    "✧",
    "❀",
    "❁",
    "·"
];


function createParticle() {

    const particle =
        document.createElement("div");

    particle.className =
        "particle";

    particle.textContent =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.fontSize =
        (Math.random() * 16 + 7) + "px";

    particle.style.animationDuration =
        (Math.random() * 8 + 8) + "s";

    particle.style.setProperty(
        "--drift",
        (Math.random() * 180 - 90) + "px"
    );

    particles.appendChild(particle);


    setTimeout(() => {
        particle.remove();
    }, 16000);

}


let particleTimer;


function startParticles() {

    if (particleTimer) {
        return;
    }

    particleTimer =
        setInterval(
            createParticle,
            650
        );

    for (
        let i = 0;
        i < 12;
        i++
    ) {

        setTimeout(
            createParticle,
            i * 150
        );

    }

}


/* =========================================
   HEART BURST
========================================= */

function createBurst() {

    const symbols =
        ["♥", "♡", "✦", "✧"];

    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const item =
            document.createElement("div");

        item.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        item.style.position =
            "fixed";

        item.style.left =
            "50%";

        item.style.top =
            "50%";

        item.style.zIndex =
            "9999";

        item.style.pointerEvents =
            "none";

        item.style.color =
            "#ff9fbd";

        item.style.fontSize =
            (Math.random() * 18 + 8) + "px";

        item.style.transition =
            "all 1.2s cubic-bezier(.2,.8,.2,1)";

        document.body.appendChild(item);


        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            Math.random() *
            300 +
            100;

        requestAnimationFrame(() => {

            item.style.transform =
                `
                translate(
                    ${Math.cos(angle) * distance}px,
                    ${Math.sin(angle) * distance}px
                )
                rotate(${Math.random() * 360}deg)
                `;

            item.style.opacity =
                "0";

        });


        setTimeout(() => {
            item.remove();
        }, 1300);

    }

}


/* =========================================
   PHOTO FALLBACK
========================================= */

const photo =
    document.getElementById("birthdayPhoto");

const placeholder =
    document.getElementById("photoPlaceholder");


photo.addEventListener(
    "error",
    () => {

        photo.style.display =
            "none";

        placeholder.style.display =
            "flex";

    }
);


photo.addEventListener(
    "load",
    () => {

        placeholder.style.display =
            "none";

        photo.style.display =
            "block";

    }
);


/* =========================================
   PHOTO PARALLAX
========================================= */

window.addEventListener(
    "scroll",
    () => {

        if (!photo) {
            return;
        }

        const rect =
            photo.getBoundingClientRect();

        const windowHeight =
            window.innerHeight;

        if (
            rect.top < windowHeight &&
            rect.bottom > 0
        ) {

            const center =
                windowHeight / 2;

            const difference =
                rect.top +
                rect.height / 2 -
                center;

            const movement =
                difference * -0.025;

            photo.style.transform =
                `scale(1.03) translateY(${movement}px)`;

        }

    }
);


/* =========================================
   CLICK SPARKLES
========================================= */

document.addEventListener(
    "click",
    event => {

        if (
            event.target.closest("button") ||
            event.target.closest("a") ||
            event.target.closest("iframe")
        ) {
            return;
        }

        createClickSpark(
            event.clientX,
            event.clientY
        );

    }
);


function createClickSpark(x, y) {

    const spark =
        document.createElement("div");

    spark.textContent =
        "✦";

    spark.style.position =
        "fixed";

    spark.style.left =
        x + "px";

    spark.style.top =
        y + "px";

    spark.style.zIndex =
        "9999";

    spark.style.pointerEvents =
        "none";

    spark.style.color =
        "#ffabc5";

    spark.style.fontSize =
        "18px";

    spark.style.transform =
        "translate(-50%, -50%)";

    spark.style.transition =
        "all .8s ease";

    document.body.appendChild(spark);


    requestAnimationFrame(() => {

        spark.style.opacity =
            "0";

        spark.style.transform =
            "translate(-50%, -70px) scale(1.5)";

    });


    setTimeout(() => {
        spark.remove();
    }, 800);

}


/* =========================================
   PAGE VISIBILITY
========================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            clearInterval(
                particleTimer
            );

            particleTimer =
                null;

        } else if (
            !site.classList.contains("hidden")
        ) {

            startParticles();

        }

    }
);
