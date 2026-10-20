document.documentElement.classList.add("js");

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");
const mobile = window.matchMedia("(max-width: 1100px)");
const groups = [...nav.querySelectorAll(".nav-group")];

function closeGroups(except) {
  for (const group of groups) if (group !== except) group.open = false;
}

function closeMenu(returnFocus = false) {
  toggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
  closeGroups();
  if (returnFocus) toggle.focus();
}

toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
});

for (const group of groups) {
  group.addEventListener("toggle", () => {
    if (group.open) closeGroups(group);
  });
}

nav.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link || !mobile.matches) return;
  closeMenu();
  // Keep keyboard focus on the destination after its mobile navigation link hides.
  if (link.hash) {
    const target = document.getElementById(link.hash.slice(1));
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  const openGroup = groups.find((group) => group.open);
  if (openGroup) {
    openGroup.open = false;
    openGroup.querySelector("summary").focus();
  } else if (toggle.getAttribute("aria-expanded") === "true") {
    closeMenu(true);
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});
document.addEventListener("focusin", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
  else if (!mobile.matches) {
    for (const group of groups) if (!group.contains(event.target)) group.open = false;
  }
});
mobile.addEventListener("change", () => closeMenu());
