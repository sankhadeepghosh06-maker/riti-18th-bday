/* =====================================================
   OPENING
===================================================== */

const openingScreen =
  document.getElementById("openingScreen");

const openButton =
  document.getElementById("openButton");

const mainContent =
  document.getElementById("mainContent");


openButton.addEventListener("click", () => {

  createHeartBurst();

  openingScreen.classList.add("hide");

  setTimeout(() => {

    mainContent.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });

  }, 700);

});


/* =====================================================
   FLOATING PARTICLES
===================================================== */

const particles =
  document.getElementById("particles");

const symbols = [
  "♥",
  "♡",
  "✦",
  "✧",
  "•"
];


function createParticle() {

  const particle =
    document.createElement("div");

  particle.className = "particle";

  particle.textContent =
    symbols[
      Math.floor(
        Math.random() * symbols.length
      )
    ];

  particle.style.left =
    Math.random() * 100 + "%";

  particle.style.fontSize =
    8 + Math.random() * 15 + "px";

  particle.style.animationDuration =
    7 + Math.random() * 8 + "s";

  particles.appendChild(particle);

  setTimeout(() => {

    particle.remove();

  }, 16000);

}


setInterval(createParticle, 700);


/* =====================================================
   HEART BURST
===================================================== */

function createHeartBurst() {

  for (let i = 0; i < 35; i++) {

    const heart =
      document.createElement("div");

    heart.textContent = "♥";

    heart.style.position = "fixed";
    heart.style.left = "50%";
    heart.style.top = "50%";

    heart.style.zIndex = "10000";

    heart.style.pointerEvents = "none";

    heart.style.color =
      Math.random() > .5
        ? "#ef8eaa"
        : "#ffffff";

    heart.style.fontSize =
      10 + Math.random() * 20 + "px";


    const angle =
      Math.random() * Math.PI * 2;

    const distance =
      100 + Math.random() * 300;

    const x =
      Math.cos(angle) * distance;

    const y =
      Math.sin(angle) * distance;


    heart.animate(

      [
        {
          transform:
            "translate(-50%, -50%) scale(0)",

          opacity: 1
        },

        {
          transform:
            `translate(
              calc(-50% + ${x}px),
              calc(-50% + ${y}px)
            )
            scale(1)`,

          opacity: 0
        }

      ],

      {
        duration:
          900 + Math.random() * 700,

        easing:
          "cubic-bezier(.2,.8,.2,1)"
      }

    );


    document.body.appendChild(heart);


    setTimeout(() => {

      heart.remove();

    }, 1800);

  }

}


/* =====================================================
   PHOTO FALLBACK
===================================================== */

const mainPhoto =
  document.getElementById("mainPhoto");


mainPhoto.addEventListener("error", () => {

  mainPhoto.src =
    "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?auto=format&fit=crop&w=1200&q=80";

});


/* =====================================================
   CLICK SPARKLES
===================================================== */

document.addEventListener(
  "click",
  (event) => {

    if (
      event.target.closest("button") ||
      event.target.closest("a")
    ) {
      return;
    }


    for (let i = 0; i < 5; i++) {

      const sparkle =
        document.createElement("div");

      sparkle.textContent = "✦";

      sparkle.style.position = "fixed";

      sparkle.style.left =
        event.clientX + "px";

      sparkle.style.top =
        event.clientY + "px";

      sparkle.style.pointerEvents = "none";

      sparkle.style.zIndex = "9998";

      sparkle.style.color = "#e9a1b5";


      const x =
        (Math.random() - .5) * 100;

      const y =
        (Math.random() - .5) * 100;


      sparkle.animate(

        [
          {
            transform:
              "translate(-50%, -50%) scale(0)",

            opacity: 1
          },

          {
            transform:
              `translate(
                calc(-50% + ${x}px),
                calc(-50% + ${y}px)
              )
              scale(1.5)`,

            opacity: 0
          }

        ],

        {
          duration: 700,
          easing: "ease-out"
        }

      );


      document.body.appendChild(sparkle);


      setTimeout(() => {

        sparkle.remove();

      }, 800);

    }

  }
);


/* =====================================================
   TAB TITLE
===================================================== */

document.addEventListener(
  "visibilitychange",
  () => {

    if (document.hidden) {

      document.title =
        "Come back, Riti ❤️";

    } else {

      document.title =
        "For Riti — 18 ❤️";

    }

  }
);
