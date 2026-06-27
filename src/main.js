// window.addEventListener("load", function() {
//   const loader = document.querySelector(".loader");

//   setTimeout(function() {
//     loader.classList.add("loader_hide");
  
//     // Completely remove the element from the DOM after it fades out
//     loader.addEventListener("transitionend", function() {
//         loader.remove();
//     });
//   }, 5000)
// });

document.addEventListener("DOMContentLoaded", function () {
  const assets = document.querySelectorAll(".track-load");
  const barFill = document.querySelector(".progress-bar-fill");
  const percentText = document.querySelector(".progress-text");
  const preloader = document.querySelector(".loader");
  const dynamicLinesContainer = document.getElementById("loaderModalDynamicText");

  const terminalLines = [
    "&emsp; FAULT STATUS:",
    "&emsp; 0X00 - 00 00 00 00 11 00 11 00",
    "&emsp; 0X01 - 01 01 10 00 10 11 10 00",
    "&emsp; 0X02 - 11 01 11 00 11 00 10 00",
    "&emsp; IMAGES...",
    "&emsp; HTML...",
    "&emsp; 0X03 - 01 11 11 11 10 00 00 00",
    "&emsp; CSS STYLES...",
    "&emsp; JS SCRIPTS...",
    "&emsp; 0X04 - 11 01 11 00 11 00 10 00",
    "&emsp; IMAGES..."
  ];

  let assetsLoaded = false;
  let timerFinished = false;
  let currentProgress = 0;

  // 1. Monitor real assets
  let loadedCount = 0;
  const totalAssets = assets.length;

  if (totalAssets === 0) {
    assetsLoaded = true;
  } else {
    assets.forEach((asset) => {
      if (asset.complete) {
        assetLoaded();
      } else {
        asset.addEventListener("load", assetLoaded);
        asset.addEventListener("error", assetLoaded);
      }
    });
  }

  function assetLoaded() {
    loadedCount++;
    if (loadedCount >= totalAssets) {
      assetsLoaded = true;
      checkCompletion();
    }
  }

  // 2. Run the 4-second (4000ms) visual simulation loop
  const simulationDuration = 4000; 
  const intervalTime = 40; // Updates every 40ms for a 25fps fluid visual
  const increment = 100 / (simulationDuration / intervalTime);

  const simulationInterval = setInterval(() => {
    currentProgress += increment;

    if (currentProgress >= 100) {
      currentProgress = 100;
      clearInterval(simulationInterval);
      timerFinished = true;
      checkCompletion();
    }

    // Keep updating the UI text and bar width
    barFill.style.width = Math.floor(currentProgress) + "%";
    percentText.textContent = Math.floor(currentProgress);

    // SYNC TEXT: Calculate how many lines to reveal based on percentage
    // e.g., at 50% progress, half of the lines array will be printed
    const linesToReveal = Math.floor((currentProgress / 100) * terminalLines.length);
    
    // Slice array up to calculated count and join with line breaks
    dynamicLinesContainer.innerHTML = terminalLines.slice(0, linesToReveal).join("<br>") + (linesToReveal > 0 ? "<br>" : "");
  }, intervalTime);

  // 3. Both conditions must pass before starting the final 5s hold
  function checkCompletion() {
    if (assetsLoaded && timerFinished) {
        // Final 5-second hold starts exactly here
        preloader.classList.add("loader_hide");

        preloader.addEventListener("transitionend", function () {
          preloader.remove();
        });
    }
  }
})

const stringLength = 2200
const stringLength1 = 2000
const stringLength2 = 6000
const updateSpeed = 50
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%. '
const loaderCards = document.querySelectorAll(".loaderCard")
const loaderCardRights = document.querySelectorAll(".loaderCardright")
const loaderCardbottoms = document.querySelectorAll(".loaderCardbottom")
const loaderCardmid1 = document.querySelectorAll(".loaderCardmid1")
const loaderCardmid2 = document.querySelectorAll(".loaderCardmid2")
const loaderCardtop = document.querySelectorAll(".loaderCardtop")
const backencodes = document.querySelectorAll(".backencodes")

const charArray = Array.from({ length: stringLength }, () => 
    chars[Math.floor(Math.random() * chars.length)]
);
const charArray1 = Array.from({ length: stringLength1 }, () => 
    chars[Math.floor(Math.random() * chars.length)]
);
const charArray2 = Array.from({ length: stringLength2 }, () => 
    chars[Math.floor(Math.random() * chars.length)]
);

const galleryGrid = document.querySelector(".galleryGrid");
const galleryScrollbar = document.querySelector(".galleryScrollbar");
const galleryScrollThumb = document.querySelector(".galleryScrollThumb");
if (galleryGrid && galleryScrollbar && galleryScrollThumb) {
    let targetScroll = galleryGrid.scrollLeft;
    let currentScroll = galleryGrid.scrollLeft;
    let rafId = null;
    let isDragging = false;

    const EASE = 0.18;
    const PIXEL_MULTIPLIER = 1.4;
    const LINE_MULTIPLIER = 28;
    const PAGE_MULTIPLIER = 400;
    const MIN_THUMB_PERCENT = 8;

    function updateThumb() {
        const scrollWidth = galleryGrid.scrollWidth;
        const clientWidth = galleryGrid.clientWidth;
        const maxScroll = scrollWidth - clientWidth;

        if (maxScroll <= 0) {
            galleryScrollbar.style.display = "none";
            return;
        }
        galleryScrollbar.style.display = "";

        const visibleRatio = clientWidth / scrollWidth;
        const thumbPercent = Math.max(visibleRatio * 100, MIN_THUMB_PERCENT);
        const scrollRatio = galleryGrid.scrollLeft / maxScroll;
        const thumbLeftPercent = scrollRatio * (100 - thumbPercent);

        galleryScrollThumb.style.width = thumbPercent + "%";
        galleryScrollThumb.style.left = thumbLeftPercent + "%";
    }

    function animate() {
        const diff = targetScroll - currentScroll;
        if (Math.abs(diff) < 0.5) {
            currentScroll = targetScroll;
            galleryGrid.scrollLeft = currentScroll;
            rafId = null;
            return;
        }
        currentScroll += diff * EASE;
        galleryGrid.scrollLeft = currentScroll;
        rafId = requestAnimationFrame(animate);
    }

    window.addEventListener("wheel", (e) => {
        if (isDragging) return;
        const rawDelta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        if (rawDelta === 0) return;
        e.preventDefault();

        let multiplier = PIXEL_MULTIPLIER;
        if (e.deltaMode === 1) multiplier = LINE_MULTIPLIER;
        else if (e.deltaMode === 2) multiplier = PAGE_MULTIPLIER;

        const maxScroll = galleryGrid.scrollWidth - galleryGrid.clientWidth;
        if (rafId === null) {
            currentScroll = galleryGrid.scrollLeft;
            targetScroll = currentScroll;
        }
        targetScroll = Math.max(0, Math.min(maxScroll, targetScroll + rawDelta * multiplier));

        if (rafId === null) rafId = requestAnimationFrame(animate);
    }, { passive: false });

    galleryGrid.addEventListener("scroll", () => {
        if (rafId === null && !isDragging) {
            currentScroll = galleryGrid.scrollLeft;
            targetScroll = currentScroll;
        }
        updateThumb();
    });

    let dragPointerId = null;
    let dragStartX = 0;
    let dragStartScroll = 0;

    galleryScrollThumb.addEventListener("pointerdown", (e) => {
        isDragging = true;
        dragPointerId = e.pointerId;
        dragStartX = e.clientX;
        dragStartScroll = galleryGrid.scrollLeft;
        galleryScrollThumb.classList.add("dragging");
        galleryScrollThumb.setPointerCapture(e.pointerId);
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        e.preventDefault();
    });

    galleryScrollThumb.addEventListener("pointermove", (e) => {
        if (!isDragging || e.pointerId !== dragPointerId) return;
        const dx = e.clientX - dragStartX;
        const trackWidth = galleryScrollbar.clientWidth;
        const thumbWidth = galleryScrollThumb.clientWidth;
        const maxScroll = galleryGrid.scrollWidth - galleryGrid.clientWidth;
        const scaleFactor = (trackWidth - thumbWidth) > 0
            ? maxScroll / (trackWidth - thumbWidth)
            : 0;
        const newScroll = Math.max(0, Math.min(maxScroll, dragStartScroll + dx * scaleFactor));
        galleryGrid.scrollLeft = newScroll;
        currentScroll = newScroll;
        targetScroll = newScroll;
    });

    function endDrag(e) {
        if (!isDragging || e.pointerId !== dragPointerId) return;
        isDragging = false;
        dragPointerId = null;
        galleryScrollThumb.classList.remove("dragging");
        if (galleryScrollThumb.hasPointerCapture(e.pointerId)) {
            galleryScrollThumb.releasePointerCapture(e.pointerId);
        }
    }
    galleryScrollThumb.addEventListener("pointerup", endDrag);
    galleryScrollThumb.addEventListener("pointercancel", endDrag);

    galleryScrollbar.addEventListener("pointerdown", (e) => {
        if (e.target === galleryScrollThumb) return;
        const rect = galleryScrollbar.getBoundingClientRect();
        const clickRatio = (e.clientX - rect.left) / rect.width;
        const maxScroll = galleryGrid.scrollWidth - galleryGrid.clientWidth;
        const newTarget = Math.max(0, Math.min(maxScroll, clickRatio * maxScroll));
        if (rafId === null) currentScroll = galleryGrid.scrollLeft;
        targetScroll = newTarget;
        if (rafId === null) rafId = requestAnimationFrame(animate);
    });

    window.addEventListener("resize", updateThumb);
    updateThumb();
}

setInterval(() => {
    const randomIndex = Math.floor(Math.random() * charArray.length);
    const randomIndex1 = Math.floor(Math.random() * charArray1.length);
    const randomIndex2 = Math.floor(Math.random() * charArray2.length);
    charArray[randomIndex] = chars[Math.floor(Math.random() * chars.length)];
    charArray1[randomIndex1] = chars[Math.floor(Math.random() * chars.length)];
    charArray2[randomIndex2] = chars[Math.floor(Math.random() * chars.length)];
    loaderCards.forEach(lc => lc.textContent = charArray.join(' '))
    loaderCardRights.forEach(lc => lc.textContent = charArray.join(' '))
    loaderCardbottoms.forEach(lc => lc.textContent = charArray.join(' '))
    loaderCardmid1.forEach(lc => lc.textContent = charArray.join(' '))
    loaderCardmid2.forEach(lc => lc.textContent = charArray.join(' '))
    loaderCardtop.forEach(lc => lc.textContent = charArray1.join(' '))
    backencodes.forEach(lc => lc.textContent = charArray2.join(' '))
}, updateSpeed)