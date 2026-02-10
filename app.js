const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwzosa9Wl4Vmg2zxhjPFOdgaMqvPEcoSACZxaMnZi6HG1nwFwvz_KENySqx-9SY34YH/exec"; 

const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const charDisplay = document.getElementById('current');
const submitBtn = document.getElementById('submitBtn');
const toast = document.getElementById('toast');

// Character counter
messageInput.addEventListener('input', () => {
    const length = messageInput.value.length;
    charDisplay.innerText = length;
    charDisplay.style.color = length >= 300 ? "#FF0050" : "#A0A0A0";
});

// Form submit
messageForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (!message) return;

    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').innerText = "Sending...";

    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Google Script handles CORS
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'message': message }).toString()
    })
    .then(() => {
        showToast("Sent to the shadows! 👻");
        messageInput.value = '';
        charDisplay.innerText = "0";
        resetButton();
    })
    .catch(() => {
        showToast("Error. Check connection.", true);
        resetButton();
    });
});

function showToast(msg, isError=false){
    toast.innerText = msg;
    toast.classList.remove('hidden');
    isError ? toast.style.background = "#FF0050" : toast.style.background = "#00F2EA";
    toast.style.opacity = "1";
    setTimeout(() => { toast.style.opacity = "0"; setTimeout(()=>toast.classList.add('hidden'),500); }, 3000);
}

function resetButton(){
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').innerText = "Send Message";
}
