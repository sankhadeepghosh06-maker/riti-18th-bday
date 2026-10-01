/* =====================================================
   RITI — MAIN SCRIPT
===================================================== */


/* =====================================================
   SUPABASE CONFIGURATION
===================================================== */

const SUPABASE_URL =
  "https://gedmzmvuzifqrzmarknh.supabase.co";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZG16bXZ1emlmcXJ6bWFya25oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyMDAzOTEsImV4cCI6MjEwNDc3NjM5MX0.UjaOzxfsYL70HMh1px8wnsz30K8llSdzrt6PFE5M4k8";

const SUPABASE_BUCKET =
  "birthday-photos";


/* =====================================================
   PASSWORDS
===================================================== */

const MAIN_PASSWORD =
  "Ilovemyriti18forever";

const UPLOAD_PASSWORD =
  "addpics";


/* =====================================================
   SUPABASE CLIENT
===================================================== */

let supabaseClient = null;

function setupSupabase() {

  if (
    !SUPABASE_URL ||
    !SUPABASE_ANON_KEY ||
    SUPABASE_URL.includes("YOUR_") ||
    SUPABASE_ANON_KEY.includes("YOUR_")
  ) {
    console.warn(
      "Supabase is not configured."
    );

    return null;
  }

  if (
    typeof window.supabase === "undefined"
  ) {
    console.warn(
      "Supabase library has not loaded."
    );

    return null;
  }

  try {

    return window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY
    );

  } catch (error) {

    console.error(
      "Supabase initialization error:",
      error
    );

    return null;
  }
}


/* =====================================================
   DOM
===================================================== */

const lockScreen =
  document.getElementById("lockScreen");

const mainContent =
  document.getElementById("mainContent");

const passwordInput =
  document.getElementById("passwordInput");

const unlockButton =
  document.getElementById("unlockButton");

const lockError =
  document.getElementById("lockError");

const envelopeWrapper =
  document.getElementById("envelopeWrapper");

const celebration =
  document.getElementById("celebration");

const floatingHearts =
  document.getElementById("floatingHearts");

const galleryGrid =
  document.getElementById("galleryGrid");

const galleryLoading =
  document.getElementById("galleryLoading");

const galleryEmpty =
  document.getElementById("galleryEmpty");


/* =====================================================
   SHOW MAIN PAGE
===================================================== */

function showMainPage() {

  /*
    Hide password screen
  */

  if (lockScreen) {
    lockScreen.classList.add("hidden");
  }

  /*
    Show main website
  */

  if (mainContent) {
    mainContent.classList.add("unlocked");
  }

  document.body.style.overflow = "";

  /*
    Start website effects
  */

  createCelebration();

  createFloatingHearts();

  loadGallery();

  /*
    Clear password field
  */

  if (passwordInput) {

    setTimeout(() => {

      passwordInput.value = "";

    }, 300);

  }
}


/* =====================================================
   PASSWORD CHECK
===================================================== */

function checkPassword() {

  if (!passwordInput) {
    console.error(
      "Password input #passwordInput was not found."
    );

    return;
  }

  const entered =
    passwordInput.value.trim();


  /* =================================================
     MAIN PASSWORD
  ================================================= */

  if (entered === MAIN_PASSWORD) {

    if (lockError) {
      lockError.classList.remove("show");
    }

    showMainPage();

    return;
  }


  /* =================================================
     ADDPICS PASSWORD
  ================================================= */

  if (entered === UPLOAD_PASSWORD) {

    if (lockError) {
      lockError.classList.remove("show");
    }

    sessionStorage.setItem(
      "addpicsAccess",
      "true"
    );

    window.location.href =
      "addpics.html";

    return;
  }


  /* =================================================
     WRONG PASSWORD
  ================================================= */

  if (lockError) {
    lockError.classList.add("show");
  }

  passwordInput.classList.add("shake");

  setTimeout(() => {

    passwordInput.classList.remove(
      "shake"
    );

  }, 400);

  passwordInput.select();
}


/* =====================================================
   PASSWORD BUTTON
===================================================== */

if (unlockButton) {

  unlockButton.addEventListener(
    "click",
    checkPassword
  );

}


/* =====================================================
   ENTER KEY
===================================================== */

if (passwordInput) {

  passwordInput.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Enter") {

        event.preventDefault();

        checkPassword();

      }

    }
  );

}


/* =====================================================
   ENVELOPE
===================================================== */

function openEnvelope() {

  if (!envelopeWrapper) {
    return;
  }

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

  createCelebration();
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
   FLOATING HEARTS
===================================================== */

function createFloatingHearts() {

  if (!floatingHearts) {
    return;
  }

  const heartCount = 18;

  for (
    let i = 0;
    i < heartCount;
    i++
  ) {

    setTimeout(() => {

      const heart =
        document.createElement("span");

      heart.className =
        "floating-heart";

      heart.textContent =
        Math.random() > 0.5
          ? "♡"
          : "♥";

      heart.style.left =
        Math.random() * 100 + "%";

      heart.style.bottom =
        "-30px";

      heart.style.fontSize =
        (10 + Math.random() * 16) + "px";

      heart.style.setProperty(
        "--drift",
        (-60 + Math.random() * 120) + "px"
      );

      heart.style.setProperty(
        "--rotation",
        (-30 + Math.random() * 60) + "deg"
      );

      heart.style.animationDelay =
        Math.random() * 2 + "s";

      floatingHearts.appendChild(
        heart
      );

      setTimeout(() => {

        heart.remove();

      }, 7000);

    }, i * 300);

  }
}


/* =====================================================
   CELEBRATION
===================================================== */

function createCelebration() {

  if (!celebration) {
    return;
  }

  for (
    let i = 0;
    i < 18;
    i++
  ) {

    const heart =
      document.createElement("span");

    heart.className =
      "celebration-heart";

    heart.textContent =
      Math.random() > 0.5
        ? "♡"
        : "♥";

    heart.style.left =
      (35 + Math.random() * 30) + "%";

    heart.style.bottom =
      "35%";

    heart.style.fontSize =
      (12 + Math.random() * 20) + "px";

    heart.style.setProperty(
      "--drift",
      (-140 + Math.random() * 280) + "px"
    );

    heart.style.setProperty(
      "--rotation",
      (-45 + Math.random() * 90) + "deg"
    );

    heart.style.animationDelay =
      Math.random() * 0.6 + "s";

    celebration.appendChild(
      heart
    );

    setTimeout(() => {

      heart.remove();

    }, 3500);

  }
}


/* =====================================================
   GALLERY
===================================================== */

async function loadGallery() {

  if (!galleryGrid) {
    return;
  }

  supabaseClient =
    supabaseClient || setupSupabase();


  /* =================================================
     SUPABASE NOT AVAILABLE
  ================================================= */

  if (!supabaseClient) {

    if (galleryLoading) {
      galleryLoading.style.display =
        "none";
    }

    if (galleryEmpty) {

      galleryEmpty.classList.add(
        "show"
      );

      const paragraph =
        galleryEmpty.querySelector("p");

      const small =
        galleryEmpty.querySelector("small");

      if (paragraph) {
        paragraph.textContent =
          "The memory gallery isn't connected yet.";
      }

      if (small) {
        small.textContent =
          "Please check the Supabase URL and key.";
      }

    }

    return;
  }


  /* =================================================
     FETCH PHOTOS
  ================================================= */

  try {

    const {
      data,
      error
    } =
      await supabaseClient
        .from("photos")
        .select(
          "id, path, created_at"
        )
        .order(
          "created_at",
          {
            ascending: false
          }
        );


    if (galleryLoading) {
      galleryLoading.style.display =
        "none";
    }


    /* ===============================================
       DATABASE ERROR
    =============================================== */

    if (error) {

      console.error(
        "GALLERY DATABASE ERROR:",
        error
      );

      if (galleryEmpty) {

        galleryEmpty.classList.add(
          "show"
        );

        const paragraph =
          galleryEmpty.querySelector("p");

        const small =
          galleryEmpty.querySelector("small");

        if (paragraph) {
          paragraph.textContent =
            "The memories couldn't be loaded.";
        }

        if (small) {
          small.textContent =
            error.message ||
            "Supabase couldn't read the photos table.";
        }

      }

      return;
    }


    /* ===============================================
       NO PHOTOS
    =============================================== */

    if (
      !data ||
      data.length === 0
    ) {

      if (galleryEmpty) {
        galleryEmpty.classList.add(
          "show"
        );
      }

      return;
    }


    /* ===============================================
       CLEAR OLD GALLERY
    =============================================== */

    galleryGrid.innerHTML = "";


    /* ===============================================
       DISPLAY PHOTOS
    =============================================== */

    data.forEach(
      (photo, index) => {

        if (!photo.path) {
          return;
        }

        const {
          data: publicData
        } =
          supabaseClient
            .storage
            .from(SUPABASE_BUCKET)
            .getPublicUrl(
              photo.path
            );


        if (
          !publicData ||
          !publicData.publicUrl
        ) {
          return;
        }


        const item =
          document.createElement(
            "div"
          );

        item.className =
          "gallery-item";

        item.style.animationDelay =
          (index * 0.06) + "s";


        const image =
          document.createElement(
            "img"
          );

        image.src =
          publicData.publicUrl;

        image.alt =
          "A birthday memory";

        image.loading =
          "lazy";


        image.onerror = () => {

          console.error(
            "IMAGE FAILED TO LOAD:",
            publicData.publicUrl
          );

        };


        const overlay =
          document.createElement(
            "div"
          );

        overlay.className =
          "gallery-overlay";

        overlay.textContent =
          "♡ memory";


        item.appendChild(
          image
        );

        item.appendChild(
          overlay
        );

        galleryGrid.appendChild(
          item
        );

      }
    );

  } catch (error) {

    console.error(
      "GALLERY ERROR:",
      error
    );

    if (galleryLoading) {
      galleryLoading.style.display =
        "none";
    }

    if (galleryEmpty) {

      galleryEmpty.classList.add(
        "show"
      );

      const paragraph =
        galleryEmpty.querySelector("p");

      const small =
        galleryEmpty.querySelector("small");

      if (paragraph) {
        paragraph.textContent =
          "Something went wrong with the gallery.";
      }

      if (small) {
        small.textContent =
          error.message ||
          "Unknown error.";
      }

    }

  }
}


/* =====================================================
   INITIALISE
===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    /*
      Keep the site locked initially.
    */

    document.body.style.overflow =
      "hidden";

    /*
      DO NOT automatically unlock.
      The user must enter the password.
    */

    if (passwordInput) {

      setTimeout(() => {

        passwordInput.focus();

      }, 100);

    }

  }
);
