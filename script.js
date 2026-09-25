/* TrackLane — concept build enhancements (vanilla JS, progressive) */
(function () {
  "use strict";

  /* Pause decorative SVG motion for reduced-motion users */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    document.querySelectorAll("animateMotion").forEach(function (el) {
      el.parentNode.removeChild(el);
    });
  }

  /* Reveal fallback where scroll-driven CSS animations are unsupported */
  var supportsSDA = CSS.supports && CSS.supports("animation-timeline", "view()");
  if (!supportsSDA && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else if (!supportsSDA) {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Deep-link support: #TRL style hashes aren't used, but opening a
     matching FAQ question via keyboard remains native <details>. */
})();
