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