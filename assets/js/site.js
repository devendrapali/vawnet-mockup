/* VAWnet prototype behaviour — no dependencies. */
(function () {
  "use strict";

  /* Mega menus */
  var menus = document.querySelectorAll("[data-menu]");
  document.querySelectorAll("[data-menu-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var name = btn.getAttribute("data-menu-toggle");
      var open = btn.getAttribute("aria-expanded") === "true";
      document.querySelectorAll("[data-menu-toggle]").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
      menus.forEach(function (m) { m.classList.toggle("is-open", !open && m.getAttribute("data-menu") === name); });
      btn.setAttribute("aria-expanded", String(!open));
    });
  });
  document.addEventListener("click", function (e) {
    if (e.target.closest(".site-header")) return;
    menus.forEach(function (m) { m.classList.remove("is-open"); });
    document.querySelectorAll("[data-menu-toggle]").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
  });

  /* Single-select button groups */
  function group(selector) {
    var items = document.querySelectorAll(selector);
    items.forEach(function (el) {
      el.addEventListener("click", function () {
        items.forEach(function (i) { i.classList.remove("is-active"); });
        el.classList.add("is-active");
      });
    });
  }
  group("[data-scope]");
  group("[data-sort]");
  group("[data-news-filter]");

  /* Facet accordion */
  document.querySelectorAll("[data-facet-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var g = btn.closest(".facet-group");
      var open = g.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
      btn.querySelector(".facet-group__sign").innerHTML = open ? "&minus;" : "+";
    });
  });

  /* Active filter chips */
  var chipHost = document.querySelector("[data-chips]");
  var countEl = document.querySelector("[data-result-count]");
  var TOTAL = 4067;

  function renderChips() {
    if (!chipHost) return;
    var checked = Array.prototype.slice.call(document.querySelectorAll("[data-facet]:checked"));
    chipHost.innerHTML = "";
    checked.forEach(function (input) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.innerHTML = input.nextElementSibling.textContent + ' <span aria-hidden="true">&times;</span>';
      chip.addEventListener("click", function () { input.checked = false; renderChips(); });
      chipHost.appendChild(chip);
    });
    if (countEl) {
      var n = checked.length ? Math.max(12, TOTAL - checked.length * 812) : TOTAL;
      countEl.textContent = n.toLocaleString();
    }
  }
  document.querySelectorAll("[data-facet]").forEach(function (i) { i.addEventListener("change", renderChips); });
  var clear = document.querySelector("[data-clear-facets]");
  if (clear) clear.addEventListener("click", function () {
    document.querySelectorAll("[data-facet]").forEach(function (i) { i.checked = false; });
    renderChips();
  });
  renderChips();

  /* Save toggles */
  document.querySelectorAll("[data-save]").forEach(function (btn) {
    var label = btn.querySelector("span");
    var saved = label.textContent;
    btn.addEventListener("click", function () {
      var on = btn.classList.toggle("is-saved");
      label.textContent = on ? saved.replace("Save", "Saved") : saved;
    });
  });

  /* Quick exit: double ESC */
  var last = 0;
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var now = Date.now();
    if (now - last < 700) window.location.replace("http://google.com/");
    last = now;
  });
})();
