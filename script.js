document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     ENVELOPE
  ===================================================== */

  const envelopeWrapper =
    document.getElementById("envelopeWrapper");

  const letterSection =
    document.getElementById("letterSection");

  let envelopeOpened = false;


  function openEnvelope() {

    if (!envelopeWrapper || envelopeOpened) {
      return;
    }

    envelopeOpened = true;

    envelopeWrapper.classList.add("opened");

    createLetterCelebration(20);

  }


  if (envelopeWrapper) {

    envelopeWrapper.addEventListener(
      "click",
      openEnvelope
    );


    envelopeWrapper.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          openEnvelope();
        }

      }
    );
  }


  /* =====================================================
     HEARTS AROUND THE LETTER
  ===================================================== */

  function createLetterCelebration(amount) {

    const celebration =
      document.getElementById("celebration");

    if (!celebration) {
      return;
    }


    const symbols = [
      "♡",
      "♥",
      "✦",
      "✧",
      "❀",
      "✿"
    ];


    for (let i = 0; i < amount; i++) {

      const heart =
        document.createElement("div");

      heart.className =
        "celebration-heart";

      heart.textContent =
        symbols[
          Math.floor(
            Math.random() * symbols.length
          )
        ];


      heart.style.left =
        `${35 + Math.random() * 30}%`;

      heart.style.top =
        `${42 + Math.random() * 15}%`;


      heart.style.setProperty(
        "--drift",
        `${(Math.random() - 0.5) * 260}px`
      );


      heart.style.setProperty(
        "--rotation",
        `${(Math.random() - 0.5) * 80}deg`
      );


      heart.style.animationDelay =
        `${Math.random() * 0.8}s`;


      heart.style.fontSize =
        `${10 + Math.random() * 17}px`;


      celebration.appendChild(heart);


      setTimeout(() => {

        heart.remove();

      }, 3800);

    }

  }


  /* =====================================================
     FLOATING HEARTS WHILE SCROLLING
  ===================================================== */

  const floatingHearts =
    document.getElementById("floatingHearts");

  let lastHeartTime = 0;


  function createScrollHeart() {

    if (!floatingHearts) {
      return;
    }


    const heart =
      document.createElement("div");

    heart.className =
      "floating-heart";


    heart.textContent =
      Math.random() > 0.5
        ? "♡"
        : "✦";


    heart.style.left =
      `${10 + Math.random() * 80}%`;

    heart.style.top =
      `${75 + Math.random() * 20}%`;


    heart.style.setProperty(
      "--drift",
      `${(Math.random() - 0.5) * 150}px`
    );


    heart.style.setProperty(
      "--rotation",
      `${(Math.random() - 0.5) * 80}deg`
    );


    heart.style.fontSize =
      `${10 + Math.random() * 12}px`;


    floatingHearts.appendChild(heart);


    setTimeout(() => {

      heart.remove();

    }, 5200);

  }


  window.addEventListener(
    "scroll",
    () => {

      const now =
        Date.now();


      if (
        now - lastHeartTime < 1000
      ) {
        return;
      }


      if (
        Math.random() < 0.25
      ) {

        createScrollHeart();

        lastHeartTime = now;
      }

    },
    { passive: true }
  );


  /* =====================================================
     INITIAL SMALL AMBIENT HEARTS
  ===================================================== */

  function createInitialHearts() {

    if (!floatingHearts) {
      return;
    }


    for (let i = 0; i < 7; i++) {

      setTimeout(() => {

        createScrollHeart();

      }, i * 650);

    }

  }


  createInitialHearts();


  /* =====================================================
     GENTLE LETTER HIGHLIGHT
  ===================================================== */

  if (letterSection) {

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "letter-visible"
              );

            }

          });

        },
        {
          threshold: 0.25
        }
      );


    observer.observe(letterSection);

  }

});
