document.addEventListener("DOMContentLoaded", () => {

  console.log("Riti's 18th birthday website loaded 💗💜");

  /*
    Gentle parallax effect for the ambient background.
    Completely optional and automatically disabled on
    devices that prefer reduced motion.
  */

  const ambient1 = document.querySelector(".ambient-1");
  const ambient2 = document.querySelector(".ambient-2");

  if (
    ambient1 &&
    ambient2 &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {

    window.addEventListener("scroll", () => {

      const scroll = window.scrollY;

      ambient1.style.transform =
        `translateY(${scroll * 0.08}px)`;

      ambient2.style.transform =
        `translateY(${scroll * -0.05}px)`;

    }, { passive: true });

  }

});
