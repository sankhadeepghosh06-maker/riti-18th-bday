```javascript
document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     ELEMENTS
     ========================================================= */

  const envelopeWrapper =
    document.getElementById("envelopeWrapper");

  const openLetterButton =
    document.getElementById("openLetterButton");

  const letterOpening =
    document.getElementById("letterOpening");

  const revealedLetter =
    document.getElementById("revealedLetter");

  const continueAfterLetter =
    document.getElementById("continueAfterLetter");

  const mainContent =
    document.getElementById("mainContent");

  const celebration =
    document.getElementById("celebration");


  /* =========================================================
     OPEN THE ENVELOPE
     ========================================================= */

  let envelopeOpened = false;


  function openEnvelope() {

    if (envelopeOpened) {
      return;
    }

    envelopeOpened = true;


    /*
      Start envelope animation.
    */

    envelopeWrapper.classList.add("opened");


    /*
      Disable the button while the animation happens.
    */

    openLetterButton.disabled = true;

    openLetterButton.style.opacity = "0";

    openLetterButton.style.transform =
      "translateY(8px)";


    /*
      Create a small burst of hearts.
    */

    createCelebration(18);


    /*
      Wait for the envelope to open,
      then reveal the actual letter.
    */

    setTimeout(() => {

      revealedLetter.classList.add("show");

    }, 850);

  }


  /* =========================================================
     CLICK BUTTON
     ========================================================= */

  openLetterButton.addEventListener(
    "click",
    openEnvelope
  );


  /* =========================================================
     CLICK ENVELOPE
     ========================================================= */

  envelopeWrapper.addEventListener(
    "click",
    openEnvelope
  );


  /* =========================================================
     KEYBOARD SUPPORT
     ========================================================= */

  envelopeWrapper.setAttribute(
    "role",
    "button"
  );

  envelopeWrapper.setAttribute(
    "tabindex",
    "0"
  );

  envelopeWrapper.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        openEnvelope();

      }

    }
  );


  /* =========================================================
     CONTINUE FROM LETTER
     ========================================================= */

  continueAfterLetter.addEventListener(
    "click",
    () => {

      /*
        Close the letter overlay.
      */

      revealedLetter.classList.remove("show");


      /*
        Fade out the opening section completely.
      */

      setTimeout(() => {

        letterOpening.classList.add("closed");

      }, 250);


      /*
        Make sure the main page is visible.
      */

      mainContent.style.display = "block";


      /*
        Give the page a moment to settle,
        then move to Chapter Eighteen.
      */

      setTimeout(() => {

        const hero =
          document.querySelector(".hero");

        if (hero) {

          hero.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

      }, 750);

    }
  );


  /* =========================================================
     CELEBRATION HEARTS
     ========================================================= */

  function createCelebration(amount) {

    const symbols = [
      "♡",
      "♥",
      "✦",
      "✧",
      "💗",
      "🌸"
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


      /*
        Random direction.
      */

      const x =
        (Math.random() - 0.5) * 520;

      const y =
        -80 -
        Math.random() * 430;


      const rotation =
        (Math.random() - 0.5) * 80;


      heart.style.setProperty(
        "--x",
        `${x}px`
      );

      heart.style.setProperty(
        "--y",
        `${y}px`
      );

      heart.style.setProperty(
        "--rotation",
        `${rotation}deg`
      );


      heart.style.animationDelay =
        `${Math.random() * .45}s`;


      heart.style.fontSize =
        `${10 + Math.random() * 18}px`;


      celebration.appendChild(heart);


      setTimeout(() => {

        heart.remove();

      }, 3300);

    }

  }


  /* =========================================================
     OPTIONAL: LITTLE HEARTS WHILE SCROLLING
     ========================================================= */

  let lastScrollTime = 0;


  window.addEventListener(
    "scroll",
    () => {

      const now =
        Date.now();


      /*
        Don't create too many particles.
      */

      if (
        now - lastScrollTime < 1000
      ) {
        return;
      }


      /*
        Only occasionally create
        a tiny floating heart.
      */

      if (
        Math.random() < 0.22
      ) {

        createScrollHeart();

      }


      lastScrollTime = now;

    },
    { passive: true }
  );


  function createScrollHeart() {

    const heart =
      document.createElement("div");

    heart.className =
      "celebration-heart";


    heart.textContent =
      Math.random() > .5
        ? "♡"
        : "✦";


    heart.style.left =
      `${20 + Math.random() * 60}%`;

    heart.style.top =
      `${70 + Math.random() * 20}%`;


    heart.style.setProperty(
      "--x",
      `${(Math.random() - .5) * 100}px`
    );


    heart.style.setProperty(
      "--y",
      `${-80 - Math.random() * 120}px`
    );


    heart.style.setProperty(
      "--rotation",
      `${(Math.random() - .5) * 60}deg`
    );


    celebration.appendChild(heart);


    setTimeout(() => {

      heart.remove();

    }, 3000);

  }

});
```
