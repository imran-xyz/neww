// Load the number from local storage or initialize to 0
let number = localStorage.getItem('number') ? parseInt(localStorage.getItem('number')) : 0;
let lastIncrementTime = localStorage.getItem('lastIncrementTime') ? parseInt(localStorage.getItem('lastIncrementTime')) : 0;
const cooldown = 30000; // 30 seconds in milliseconds

// Display the number on page load
document.getElementById('numberDisplay').textContent = number;

// Function to update the button state and countdown
function updateButtonState() {
    const currentTime = new Date().getTime();
    const timeRemaining = cooldown - (currentTime - lastIncrementTime);
    const incrementButton = document.getElementById('incrementButton');

    if (timeRemaining > 0) {
        incrementButton.disabled = true;
        incrementButton.textContent = Math.ceil(timeRemaining / 1000);
        setTimeout(updateButtonState, 1000); // Update every second
    } else {
        incrementButton.disabled = false;
        incrementButton.textContent = '✔';
    }
}

// Call the function to set the initial button state
updateButtonState();

function incrementNumber() {
    const currentTime = new Date().getTime();

    // Prevent incrementing if ad is NOT loaded
    if (!adLoaded) {
        alert("Please watch the ad before earning points.");
        return;
    }

    if (currentTime - lastIncrementTime >= cooldown) {
        number++;
        lastIncrementTime = currentTime;
        localStorage.setItem('number', number);
        localStorage.setItem('lastIncrementTime', lastIncrementTime);
        document.getElementById('numberDisplay').textContent = number;
        updateButtonState(); // Update the button state after incrementing

        // Reset ad state so user has to watch a new ad
        adLoaded = false;
    }
}

function resetNumber() {
    number = 0;
    localStorage.setItem('number', number);
    document.getElementById('numberDisplay').textContent = number;
}

// Ads code
let adLoaded = false; // Track if the ad has loaded

function checkAdLoaded() {
    const adElement = document.querySelector(".adsbygoogle");
    if (adElement && adElement.offsetHeight > 0) {
        adLoaded = true;
    }
}

function showAd() {
    checkAdLoaded();

    if (adLoaded) {
        document.getElementById("adContainer").style.display = "flex";
    } else {
        alert("Ad is not loaded yet. Please try again later.");
    }
}

function closeAd() {
    document.getElementById("adContainer").style.display = "none";
    adLoaded = true; // Mark the ad as watched after closing
}

// Automatically check if an ad is loaded after AdSense processes it
window.onload = function () {
    setTimeout(checkAdLoaded, 3000);
};
