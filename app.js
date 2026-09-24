// app.js — IPL 2026 Ticket Booking
// 1. Reusable toast notification function
function showToast(message, duration = 3000) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = "toast";
 
    document.body.appendChild(toast);
 
    // Trigger the fade-in on the next tick (so the transition actually plays)
    setTimeout(() => toast.classList.add("show"), 100);
 
    // Fade out and remove after `duration` ms
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// 2. Book links -> smooth scroll to booking form
//    + pre-select the matching match in the dropdown
const bookLinks = document.querySelectorAll(".book-btn");
const bookingSection = document.getElementById("booking");
const matchSelect = document.getElementById("match");
 
bookLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault(); // we'll handle the scroll ourselves
 
        const matchValue = link.getAttribute("data-match");
 
        // Pre-select this match in the booking form dropdown
        if (matchValue) {
            matchSelect.value = matchValue;
        }
 
        // Smooth-scroll to the booking section
        bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
 
        // Grab the readable match name for the toast (e.g. "RCB vs CSK")
        const matchText = matchSelect.options[matchSelect.selectedIndex]?.text || "match";
        showToast(`${matchText} selected — complete your booking below`);
    });
});

// 3. Booking form submit -> confirmation toast

const bookingForm = document.querySelector("#booking form");
 
bookingForm.addEventListener("submit", (event) => {
    event.preventDefault(); // stop page reload
 
    const name = document.getElementById("name").value;
 
    showToast(`Booking confirmed for ${name}!`);
    bookingForm.reset();
});
 