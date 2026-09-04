/* =========================================
   ROMANTIC QR WEBSITE
========================================= */


/* =========================================
   OPENING SCREEN
========================================= */

const enterButton = document.getElementById("enter-button");
const openingScreen = document.getElementById("opening-screen");
const mainContent = document.getElementById("main-content");

enterButton.addEventListener("click", function () {

    // Fade out opening screen
    openingScreen.classList.add("hide");

    // Reveal main page
    setTimeout(function () {
        mainContent.classList.remove("hidden");
    }, 400);

    // Start creating hearts
    startHearts();

});


/* =========================================
   FLOATING HEARTS
========================================= */

const heartsContainer =
    document.getElementById("hearts-container");

const heartCharacters = [
    "♥",
    "♡",
    "❤",
    "✦",
    "✧"
];


function createHeart() {

    const heart = document.createElement("div");

    heart.classList.add("floating-heart");

    heart.innerHTML =
        heartCharacters[
            Math.floor(
                Math.random() * heartCharacters.length
            )
        ];

    // Random horizontal position
    heart.style.left =
        Math.random() * 100 + "%";

    // Random size
    const size =
        Math.random() * 18 + 8;

    heart.style.fontSize =
        size + "px";

    // Random animation duration
    const duration =
        Math.random() * 7 + 7;

    heart.style.animationDuration =
        duration + "s";

    // Random horizontal drift
    const drift =
        (Math.random() * 160 - 80) + "px";

    heart.style.setProperty(
        "--drift",
        drift
    );

    heartsContainer.appendChild(heart);


    // Remove after animation
    setTimeout(function () {

        heart.remove();

    }, duration * 1000);

}


let heartInterval;


function startHearts() {

    // Don't start twice
    if (heartInterval) {
        return;
    }

    // Create hearts regularly
    heartInterval = setInterval(
        createHeart,
        800
    );

    // Initial hearts
    for (let i = 0; i < 8; i++) {

        setTimeout(
            createHeart,
            i * 250
        );

    }

}


/* =========================================
   CLICK HEART EFFECT
========================================= */

document.addEventListener(
    "click",
    function (event) {

        // Don't create click hearts when
        // clicking links/buttons
        if (
            event.target.closest("a") ||
            event.target.closest("button")
        ) {
            return;
        }

        createClickHeart(
            event.clientX,
            event.clientY
        );

    }
);


function createClickHeart(x, y) {

    const heart =
        document.createElement("div");

    heart.innerHTML = "♥";

    heart.style.position = "fixed";

    heart.style.left = x + "px";

    heart.style.top = y + "px";

    heart.style.pointerEvents = "none";

    heart.style.zIndex = "9999";

    heart.style.color = "#ff9dbb";

    heart.style.fontSize =
        Math.random() * 15 + 15 + "px";

    heart.style.transform =
        "translate(-50%, -50%)";

    heart.style.transition =
        "all 1s ease";

    document.body.appendChild(heart);


    // Trigger animation
    requestAnimationFrame(function () {

        heart.style.opacity = "0";

        heart.style.transform =
            "translate(-50%, -130px) scale(1.5)";

    });


    setTimeout(function () {

        heart.remove();

    }, 1000);

}


/* =========================================
   IMAGE FALLBACK
========================================= */

const photo =
    document.querySelector(".main-photo");

const placeholder =
    document.getElementById("photo-placeholder");


if (photo) {

    photo.addEventListener(
        "load",
        function () {

            placeholder.style.display =
                "none";

            photo.style.display =
                "block";

        }
    );

}


/* =========================================
   PAGE VISIBILITY
========================================= */

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.hidden
        ) {

            // Pause heart creation
            clearInterval(
                heartInterval
            );

            heartInterval = null;

        } else {

            // Resume hearts
            if (
                mainContent.classList.contains(
                    "hidden"
                ) === false
            ) {

                startHearts();

            }

        }

    }
);


/* =========================================
   PREVENT RIGHT CLICK
   Optional — remove this section if
   you don't want it.
========================================= */

// Uncomment if desired:
//
// document.addEventListener(
//     "contextmenu",
//     function(event) {
//         event.preventDefault();
//     }
// );


/* =========================================
   STARTUP
========================================= */

// Keep main content hidden initially
mainContent.classList.add("hidden");
