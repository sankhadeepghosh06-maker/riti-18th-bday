/* =====================================================
   RITI — 18TH BIRTHDAY
   MAIN PAGE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     PASSWORD LOCK
  ====================================================== */

  const CORRECT_PASSWORD = "Ilovemyriti18forever";

  const lockScreen =
    document.getElementById("lockScreen");

  const mainContent =
    document.getElementById("mainContent");

  const passwordInput =
    document.getElementById("passwordInput");

  const unlockButton =
    document.getElementById("unlockButton");

  const passwordError =
    document.getElementById("passwordError");

  const lockCard =
    document.querySelector(".lock-card");


  function unlockPage() {

    const enteredPassword =
      passwordInput.value;

    if (enteredPassword === CORRECT_PASSWORD) {

      passwordError.classList.remove("show");

      unlockButton.disabled = true;

      createUnlockCelebration();

      lockScreen.classList.add("hidden");

      mainContent.classList.add("unlocked");

      setTimeout(() => {
        startFloatingHearts();
      }, 700);

    } else {

      passwordError.classList.add("show");

      lockCard.classList.remove("shake");

      /*
        Force browser to restart the animation
        if the user enters the wrong password
        multiple times.
      */

      void lockCard.offsetWidth;

      lockCard.classList.add("shake");

      passwordInput.value = "";

      passwordInput.focus();
    }
  }


  if (unlockButton) {
    unlockButton.addEventListener(
      "click",
      unlockPage
    );
  }


  if (passwordInput) {

    passwordInput.addEventListener(
      "keydown",
      (event) => {

        if (event.key === "Enter") {
          unlockPage();
        }

      }
    );

    /*
      Automatically place the cursor
      in the password field.
    */

    setTimeout(() => {
      passwordInput.focus();
    }, 500);
  }


  /* =====================================================
     ENVELOPE
  ====================================================== */

  const envelopeWrapper =
    document.getElementById(
      "envelopeWrapper"
    );


  if (envelopeWrapper) {

    function openEnvelope() {

      if (
        envelopeWrapper.classList.contains(
          "opened"
        )
      ) {
        return;
      }

      envelopeWrapper.classList.add(
        "opened"
      );

      createEnvelopeCelebration();
    }


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
     FLOATING HEARTS
  ====================================================== */

  function startFloatingHearts() {

    const container =
      document.getElementById(
        "floatingHearts"
      );

    if (!container) {
      return;
    }

    /*
      Small continuous background
      heart animation.
    */

    setInterval(() => {

      createFloatingHeart(
        container
      );

    }, 1800);

  }


  function createFloatingHeart(container) {

    const heart =
      document.createElement("div");

    heart.className =
      "floating-heart";

    const symbols = [
      "♡",
      "♥",
      "✦",
      "⋆"
    ];

    heart.textContent =
      symbols[
        Math.floor(
          Math.random() * symbols.length
        )
      ];

    heart.style.left =
      Math.random() * 100 + "%";

    heart.style.bottom =
      "-30px";

    heart.style.fontSize =
      (10 + Math.random() * 15) + "px";

    heart.style.setProperty(
      "--drift",
      (-40 + Math.random() * 80) + "px"
    );

    heart.style.setProperty(
      "--rotation",
      (-25 + Math.random() * 50) + "deg"
    );

    heart.style.animationDuration =
      (4 + Math.random() * 3) + "s";

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 7500);

  }


  /* =====================================================
     UNLOCK CELEBRATION
  ====================================================== */

  function createUnlockCelebration() {

    const container =
      document.getElementById(
        "celebration"
      );

    if (!container) {
      return;
    }

    const symbols = [
      "♡",
      "♥",
      "✦",
      "✧"
    ];

    for (let i = 0; i < 24; i++) {

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
        (35 + Math.random() * 30) + "%";

      heart.style.top =
        (45 + Math.random() * 15) + "%";

      heart.style.fontSize =
        (12 + Math.random() * 18) + "px";

      heart.style.setProperty(
        "--drift",
        (-140 + Math.random() * 280) + "px"
      );

      heart.style.setProperty(
        "--rotation",
        (-80 + Math.random() * 160) + "deg"
      );

      heart.style.animationDelay =
        (Math.random() * 0.5) + "s";

      container.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 3500);

    }

  }


  /* =====================================================
     ENVELOPE CELEBRATION
  ====================================================== */

  function createEnvelopeCelebration() {

    const container =
      document.getElementById(
        "celebration"
      );

    if (!container) {
      return;
    }

    const symbols = [
      "♡",
      "♥",
      "✦"
    ];

    for (let i = 0; i < 14; i++) {

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
        (25 + Math.random() * 50) + "%";

      heart.style.top =
        "45%";

      heart.style.fontSize =
        (10 + Math.random() * 15) + "px";

      heart.style.setProperty(
        "--drift",
        (-100 + Math.random() * 200) + "px"
      );

      heart.style.setProperty(
        "--rotation",
        (-60 + Math.random() * 120) + "deg"
      );

      heart.style.animationDelay =
        (Math.random() * 0.3) + "s";

      container.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 3500);

    }

  }

});
