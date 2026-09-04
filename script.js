document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     GET ELEMENTS
     ===================================================== */

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


  /* =====================================================
     SAFETY CHECK
     ===================================================== */

  if (
    !envelopeWrapper ||
    !openLetterButton ||
    !letterOpening ||
    !revealedLetter ||
    !continueAfterLetter
  ) {
    console.error(
      "Birthday page: required envelope elements are missing."
    );

    return;
  }


  /* =====================================================
     INITIAL STATE
     ===================================================== */

  document.body.classList.add("locked");

  let envelopeOpened = false;


  /* =====================================================
     OPEN ENVELOPE
     ===================================================== */

  function openEnvelope() {

    if (envelopeOpened) {
      return;
    }

    envelopeOpened = true;


    /* Animate envelope */

    envelopeWrapper.classList.add("opened");


    /* Disable button */

    openLetterButton.disabled = true;

    openLetterButton.style.opacity = "0";

    openLetterButton.style.transform =
      "translateY(8px)";


    /* Hide hint */

    const tapHint =
      document.querySelector(".tap-hint");

    if (tapHint) {

      tapHint.style.opacity = "0";

      tapHint.style.transition =
        "opacity .3s ease";
    }


    /* Little celebration */

    createCelebration(18);


    /*
      Give the envelope enough time to visibly open
      before showing the actual letter.
    */

    setTimeout(() => {

      revealedLetter.classList.add("show");

      revealedLetter.setAttribute(
        "aria-hidden",
        "false"
      );

    }, 850);

  }


  /* =====================================================
     BUTTON
     ===================================================== */

  openLetterButton.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      openEnvelope();

    }
  );


  /* =====================================================
     ENVELOPE
     ===================================================== */

  envelopeWrapper.addEventListener(
    "click",
    openEnvelope
  );


  /* =====================================================
     KEYBOARD
     ===================================================== */

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


  /* =====================================================
     CONTINUE TO ORIGINAL PAGE
     ===================================================== */

  continueAfterLetter.addEventListener(
    "click",
    () => {

      /* Close letter */

      revealedLetter.classList.remove("show");

      revealedLetter.setAttribute(
        "aria-hidden",
        "true"
      );


      /*
        Wait until the letter fades away,
        then remove the opening screen.
      */

      setTimeout(() => {

        letterOpening.classList.add("closed");

        document.body.classList.remove("locked");

        /*
          The original page was never removed.
          It has been underneath the envelope screen
          the entire time.
        */

        if (mainContent) {
          mainContent.style.display = "block";
        }

      }, 350);


      /*
        Scroll to the beginning of the original page.
      */

      setTimeout(() => {

        const hero =
          document.querySelector(".hero");

        if (hero) {

          window.scrollTo({
            top: hero.offsetTop,
            behavior: "smooth"
          });

        }

      }, 800);

    }
  );


  /* =====================================================
     CELEBRATION
     ===================================================== */

  function createCelebration(amount) {

    if (!celebration) {
      return;
    }


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


  /* =====================================================
     LITTLE HEARTS WHILE SCROLLING
     ===================================================== */

  let lastScrollTime = 0;


  window.addEventListener(
    "scroll",
    () => {

      const now =
        Date.now();


      if (
        now - lastScrollTime < 1000
      ) {

        return;

      }


      if (
        Math.random() < 0.22
      ) {

        createScrollHeart();

      }


      lastScrollTime = now;

    },
    {
      passive: true
    }
  );


  /* =====================================================
     SCROLL HEART
     ===================================================== */

  function createScrollHeart() {

    if (!celebration) {
      return;
    }


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
