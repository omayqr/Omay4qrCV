// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn?.addEventListener("click", () => {
  const isOpen = mobileNav.style.display === "block";
  mobileNav.style.display = isOpen ? "none" : "block";
  mobileNav.setAttribute("aria-hidden", String(isOpen));
});

mobileNav?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    mobileNav.style.display = "none";
    mobileNav.setAttribute("aria-hidden", "true");
  });
});

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Reveal animations on scroll
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("reveal--on");
  });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));

// Lightbox for certificates
const lb = document.getElementById("lightbox");
const lbBack = document.getElementById("lbBack");
const lbClose = document.getElementById("lbClose");
const lbImg = document.getElementById("lbImg");
const lbTitle = document.getElementById("lbTitle");
const lbSub = document.getElementById("lbSub");
const lbOpen = document.getElementById("lbOpen");

function openLightbox({ full, title, sub }) {
  lbImg.src = full;
  lbTitle.textContent = title;
  lbSub.textContent = sub;
  lbOpen.href = full;

  lb.classList.add("show");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lb.classList.remove("show");
  lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".certItem").forEach(btn => {
  btn.addEventListener("click", () => {
    openLightbox({
      full: btn.dataset.full,
      title: btn.dataset.title,
      sub: btn.dataset.sub
    });
  });
});

lbBack?.addEventListener("click", closeLightbox);
lbClose?.addEventListener("click", closeLightbox);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});