const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}
/* ---------- GALLERY ---------- */
let isFragranceView = false;

const images = [
    "assets/product1.jpg",
    "assets/product2.jpg",
    "assets/product3.jpg",
    "assets/product4.jpg"
];

let current = 0;
const imgEl = document.getElementById("currentImage");

function updateImage() {
  if (!imgEl) return;

  // ❌ Do NOT override fragrance image
  if (isFragranceView) return;

  imgEl.src = images[current];

  document.querySelectorAll(".dots span").forEach((dot, i) => {
    dot.classList.toggle("active", i === current);
  });
}


const fragranceGalleryMap = {
  original: "assets/bottle.png",
  lily: "assets/purplrbottle.webp",
  rose: "assets/red.jpg"
};

function showFragranceInGallery(fragranceKey) {
  const src = fragranceGalleryMap[fragranceKey];
  if (!src || !imgEl) return;

  isFragranceView = true;
  imgEl.src = src;

  // Reset dot states
  document.querySelectorAll(".dots span").forEach(dot =>
    dot.classList.remove("active")
  );
}

function nextImage() {
  isFragranceView = false;
  current = (current + 1) % images.length;
  updateImage();
}

function prevImage() {
  isFragranceView = false;
  current = (current - 1 + images.length) % images.length;
  updateImage();
}

function setImage(index) {
  isFragranceView = false;
  current = index;
  updateImage();
}


/* ---------- PRODUCT OPTIONS ---------- */
const fragranceRadios = document.querySelectorAll('input[name="fragrance"]');
const subscriptionRadios = document.querySelectorAll('input[name="subscription"]');

const singleBox = document.querySelector('.included-box.single');
const doubleBox = document.querySelector('.included-box.double');

const singleImg = document.getElementById('singleImg');
const doubleImg1 = document.getElementById('doubleImg1');
const doubleImg2 = document.getElementById('doubleImg2');

/* Update images based on fragrance */
function updateFragrance() {
    const selected = document.querySelector('input[name="fragrance"]:checked').value;
    const imgPath = `assets/${selected}.png`;

    singleImg.src = imgPath;
    doubleImg1.src = imgPath;
    doubleImg2.src = imgPath;
}

/* Toggle subscription */
function updateSubscription() {
    const sub = document.querySelector('input[name="subscription"]:checked').value;

    if (singleBox && doubleBox) {
        singleBox.classList.toggle('active', sub === 'single');
        doubleBox.classList.toggle('active', sub === 'double');
    }
}

/* Event listeners */
fragranceRadios.forEach(r =>
    r.addEventListener('change', updateFragrance)
);

subscriptionRadios.forEach(r =>
    r.addEventListener('change', updateSubscription)
);

/* Init */
document.addEventListener("DOMContentLoaded", () => {
    updateFragrance();
    updateSubscription();
});

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".persent-section");
    const numbers = document.querySelectorAll(".box1 h1");

    if (!section || numbers.length === 0) return;

    let hasRun = false;

    const animateCounters = () => {
        numbers.forEach(num => {
            let current = 0;
            const target = parseInt(num.dataset.target, 10);

            const interval = setInterval(() => {
                current++;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                }
                num.textContent = current + "%";
            }, 20);
        });
    };

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !hasRun) {
            hasRun = true;
            animateCounters();
            observer.disconnect();
        }
    }, { threshold: 0.1 });

    observer.observe(section);
});



document.querySelectorAll('.fragrance').forEach(card => {
    card.addEventListener('click', () => {
        const group = card.closest('.fragrances');
        group.querySelectorAll('.fragrance').forEach(f => f.classList.remove('active'));
        card.classList.add('active');
    });
});

// function switchPlan(type) {
//     if (!singleContent || !singlePlan || !doubleContent || !doublePlan) return;

//     document.querySelectorAll('.plan-content').forEach(p => p.classList.remove('active'));
//     document.querySelectorAll('.subscription').forEach(s => s.classList.remove('active'));

//     if (type === 'single') {
//         singleContent.classList.add('active');
//         singlePlan.classList.add('active');
//     } else {
//         doubleContent.classList.add('active');
//         doublePlan.classList.add('active');
//     }
// }

function switchPlan(plan) {
    const singlePlan = document.getElementById("singlePlan");
    const doublePlan = document.getElementById("doublePlan");
    const singleContent = document.getElementById("singleContent");
    const doubleContent = document.getElementById("doubleContent");

    if (plan === "single") {
        singlePlan.classList.add("active");
        doublePlan.classList.remove("active");
        singleContent.classList.add("active");
        doubleContent.classList.remove("active");
    } else {
        doublePlan.classList.add("active");
        singlePlan.classList.remove("active");
        doubleContent.classList.add("active");
        singleContent.classList.remove("active");
    }

    updateCartLink();
}
document.querySelectorAll(".fragrance").forEach(card => {
  card.addEventListener("click", () => {
    const group = card.closest(".fragrances");
    group.querySelectorAll(".fragrance").forEach(f =>
      f.classList.remove("active")
    );

    card.classList.add("active");
    card.querySelector("input").checked = true;

    const fragrance = card
      .querySelector("span")
      .innerText.toLowerCase();

    showFragranceInGallery(fragrance);
    updateCartLink();
  });
});


// function switchPlan(plan) {
//   const singlePlan = document.getElementById("singlePlan");
//   const doublePlan = document.getElementById("doublePlan");

//   const singleContent = document.getElementById("singleContent");
//   const doubleContent = document.getElementById("doubleContent");

//   if (plan === "single") {
//     singlePlan.classList.add("active");
//     doublePlan.classList.remove("active");

//     singleContent.classList.add("active");
//     doubleContent.classList.remove("active");
//   } else {
//     doublePlan.classList.add("active");
//     singlePlan.classList.remove("active");

//     doubleContent.classList.add("active");
//     singleContent.classList.remove("active");
//   }
// }

document.addEventListener("DOMContentLoaded", () => {
    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach(item => {
        const header = item.querySelector(".containt");
        const icon = header.querySelector("h2");

        header.addEventListener("click", () => {
            // Close all
            accordions.forEach(acc => {
                acc.classList.remove("active");
                acc.querySelector("h2").innerText = "+";
            });

            // Open clicked
            item.classList.add("active");
            icon.innerText = "-";
        });
    });
});

const addToCartBtn = document.querySelector(".add-to-cart");

function updateCartLink() {
    const plan = document.querySelector('input[name="plan"]:checked')?.parentElement.textContent.trim();

    let fragrance = "original";

    // SINGLE
    const singleActive = document.querySelector("#singleContent.active");
    if (singleActive) {
        fragrance = singleActive.querySelector(".fragrance.active span").innerText.toLowerCase();
    }

    // DOUBLE
    const doubleActive = document.querySelector("#doubleContent.active");
    if (doubleActive) {
        const f1 = doubleActive.querySelector('input[name="scent1"]:checked')
            ?.closest(".fragrance")
            .querySelector("span").innerText.toLowerCase();

        const f2 = doubleActive.querySelector('input[name="scent2"]:checked')
            ?.closest(".fragrance")
            .querySelector("span").innerText.toLowerCase();

        fragrance = `${f1}-${f2}`;
    }

    const planType = plan.includes("Double") ? "double" : "single";

    // Dummy dynamic link
    const link = `https://dummycart.com/add?plan=${planType}&fragrance=${fragrance}`;

    addToCartBtn.setAttribute("data-link", link);
    addToCartBtn.onclick = () => window.location.href = link;
}
function updateImage() {
    imgEl.src = images[current];

    document.querySelectorAll(".dots span").forEach((dot, i) => {
        dot.classList.toggle("active", i === current);
    });
}
