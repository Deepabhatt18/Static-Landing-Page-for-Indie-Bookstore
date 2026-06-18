const EVENT_DATE = new Date('2025-07-19T19:00:00');

function updateCountdown() {
  const now  = new Date();
  const diff = EVENT_DATE - now; 
  if (diff <= 0) {
    document.getElementById('countdown').innerHTML =
      '<p style="color:var(--brand-accent);font-size:1.2rem;font-weight:700;">Event is Live Now! 🎉</p>';
    return;
  }
  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs  = Math.floor((diff % (1000 * 60)) / 1000);
  const pad = (n) => String(n).padStart(2, '0');
  document.getElementById('cd-days').textContent  = pad(days);
  document.getElementById('cd-hours').textContent = pad(hours);
  document.getElementById('cd-mins').textContent  = pad(mins);
  document.getElementById('cd-secs').textContent  = pad(secs);
}
updateCountdown();
setInterval(updateCountdown, 1000);
const ctaBtn     = document.getElementById('btn');
const rsvpSection = document.getElementById('rsvp-section');

if (ctaBtn && rsvpSection) {
  ctaBtn.addEventListener('click', function () {
    rsvpSection.scrollIntoView({ behavior: 'smooth' });
  });
}
const bioButtons = document.querySelectorAll('.btn-bio-toggle');

bioButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    const bioId  = btn.getAttribute('aria-controls');
    const bioEl  = document.getElementById(bioId);
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      bioEl.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = 'Read More ▾';
    } else {
      bioEl.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      btn.textContent = 'Read Less ▴';
    }
  });
});
const form       = document.getElementById('rsvp-form');
const nameInput  = document.getElementById('rsvp-name');
const emailInput = document.getElementById('rsvp-email');
const nameError  = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
function showError(input, errorEl, message) {
  input.classList.add('invalid');
  errorEl.textContent = message;
}
function clearError(input, errorEl) {
  input.classList.remove('invalid');
  errorEl.textContent = '';
}
nameInput.addEventListener('input', function () {
  if (nameInput.value.trim() !== '') {
    clearError(nameInput, nameError);
  }
});

emailInput.addEventListener('input', function () {
  if (emailInput.value.trim() !== '') {
    clearError(emailInput, emailError);
  }
});
form.addEventListener('submit', function (e) {
  e.preventDefault(); 

  let isValid = true;
  if (nameInput.value.trim() === '') {
    showError(nameInput, nameError, 'Please enter your full name.');
    isValid = false;
  } else {
    clearError(nameInput, nameError);
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === '') {
    showError(emailInput, emailError, 'Please enter your email address.');
    isValid = false;
  } else if (!emailRegex.test(emailInput.value.trim())) {
    showError(emailInput, emailError, 'Please enter a valid email address.');
    isValid = false;
  } else {
    clearError(emailInput, emailError);
  }
  if (isValid) {
    console.log('RSVP Data:', {
      name        : nameInput.value.trim(),
      email       : emailInput.value.trim(),
      affiliation : document.getElementById('rsvp-affiliation').value.trim()
    });
    form.style.display = 'none';

    const successBox = document.createElement('div');
    successBox.className = 'rsvp-success';
    successBox.style.display = 'block';
    successBox.innerHTML = `
      <h3>✅ You're Confirmed!</h3>
      <p>Thank you, <strong>${nameInput.value.trim()}</strong>!</p>
      <p>We look forward to seeing you on <strong>July 19, 2025</strong>.</p>
      <p style="margin-top:0.5rem;font-size:0.85rem;color:#5a4a3a;">
        A confirmation will be sent to <em>${emailInput.value.trim()}</em>
      </p>
    `;

    form.parentNode.appendChild(successBox);
  }
});