// Typing animation for name
const nameStr = "Tyler G. Hand";
let idx = 0;
const typedName = document.getElementById("typed-name");
function typeWriter() {
    if (idx < nameStr.length) {
        typedName.textContent += nameStr.charAt(idx);
        idx++;
        setTimeout(typeWriter, 85);
    }
}
typeWriter();

// Simple contact form feedback (no backend)
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        document.getElementById("form-message").textContent =
            "Thank you for reaching out! (This demo does not send real emails.)";
        contactForm.reset();
    });
}
