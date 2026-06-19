'use strict';
const FALLBACK_DATE = new Date('2025-07-19T19:00:00');
let eventDate = FALLBACK_DATE;
let countdownInterval = null;
const LOCAL_EVENT_DATA = {
  eventName : "Literary Nexus Gala",
  eventDate : "2025-07-19T19:00:00Z",
  location  : "Portland Grand Ballroom",
  address   : "1234 SW Broadway, Portland, OR 97201"
};

async function fetchEventDate() {
  try {
    const response = await fetch(
      'https://api.mocki.io/v2/01d0a1b0-2f3b-4c4d-9e0a-1b0c2d3e4f5a'
    );

    if (!response.ok) throw new Error('API not OK');

    const data = await response.json();
    applyEventData(data);
    console.log('Event data loaded from live API');

  } catch (error) {
    console.warn('Live API unavailable, using embedded local data');
    applyEventData(LOCAL_EVENT_DATA);

  } finally {
    startCountdown();
  }
}

function applyEventData(data) {
  if (data.eventDate) {
    eventDate = new Date(data.eventDate);
  }
  if (data.eventName) {
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
      heroTitle.innerHTML =
        `The Literary Nexus Presents:<br/><em>${data.eventName}</em>`;
    }
  }
}
function startCountdown() {
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const now  = new Date();
  const diff = eventDate - now;
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

  if (diff <= 0) {
    clearInterval(countdownInterval);
    countdownEl.innerHTML =
      '<p style="color:var(--accent-gold);font-size:1.1rem;font-weight:700;">The Event is Live Now! 🎉</p>';
    return;
  }

  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const pad   = (n) => String(n).padStart(2, '0');

  document.getElementById('cd-days').textContent  = pad(days);
  document.getElementById('cd-hours').textContent = pad(hours);
  document.getElementById('cd-mins').textContent  = pad(mins);
}

fetchEventDate();
const ctaBtn      = document.getElementById('cta-btn');
const rsvpSection = document.getElementById('rsvp-section');

if (ctaBtn && rsvpSection) {
  ctaBtn.addEventListener('click', function () {
    rsvpSection.scrollIntoView({ behavior: 'smooth' });
  });
}
async function fetchAuthors() {
  const grid      = document.getElementById('authors-grid');
  const loadingEl = document.getElementById('loading-authors');

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('Authors API failed');

    const users = await response.json();
    if (loadingEl) loadingEl.remove();

    const authors = users.map(user => ({
      authorName : user.name,
      authorEmail: user.email,
      bioSnippet : user.company.catchPhrase,
      fullBio    : user.company.bs,
      id         : user.id,
      imageUrl   : `https://picsum.photos/id/${user.id}/200/200`
    }));

    authors.forEach(author => {
      grid.appendChild(createAuthorCard(author));
    });

  } catch (error) {
    console.error('Failed to load authors:', error);
    if (loadingEl) {
      loadingEl.innerHTML =
        '<p style="color:#c0392b;">Unable to load authors. Please check your connection.</p>';
    }
  }
}
function createAuthorCard(author) {
  const card  = document.createElement('article');
  card.className = 'author-card';
  const bioId = `bio-full-${author.id}`;

  card.innerHTML = `
    <div class="author-photo-wrap">
      <img
        class="author-photo"
        src="${author.imageUrl}"
        alt="Portrait of ${author.authorName}"
        loading="lazy"
        onerror="this.src='https://picsum.photos/id/64/200/200'"
      />
    </div>
    <h3>${author.authorName}</h3>
    <p class="author-email">${author.authorEmail}</p>
    <p class="author-bio-snippet">${author.bioSnippet}</p>
    <button class="btn-view-profile" aria-expanded="false" aria-controls="${bioId}">
      View Full Profile ▾
    </button>
    <div class="author-bio-full" id="${bioId}" hidden>
      ${author.fullBio}
    </div>
  `;

  const toggleBtn = card.querySelector('.btn-view-profile');
  const fullBioEl = card.querySelector('.author-bio-full');

  toggleBtn.addEventListener('click', function () {
    const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    fullBioEl.hidden = isOpen;
    toggleBtn.setAttribute('aria-expanded', String(!isOpen));
    toggleBtn.textContent = isOpen ? 'View Full Profile ▾' : 'Close Profile ▴';
  });

  return card;
}

fetchAuthors();
const form       = document.getElementById('rsvp-form');
const nameInput  = document.getElementById('rsvp-name');
const emailInput = document.getElementById('rsvp-email');
const nameError  = document.getElementById('name-error');
const emailError = document.getElementById('email-error');

function showError(input, errorEl, msg) {
  input.classList.add('invalid');
  input.setAttribute('aria-invalid', 'true');
  errorEl.textContent = msg;
}

function clearError(input, errorEl) {
  input.classList.remove('invalid');
  input.setAttribute('aria-invalid', 'false');
  errorEl.textContent = '';
}

if (nameInput)  nameInput.addEventListener('input',  () => { if (nameInput.value.trim())  clearError(nameInput,  nameError);  });
if (emailInput) emailInput.addEventListener('input', () => { if (emailInput.value.trim()) clearError(emailInput, emailError); });

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    if (!nameInput.value.trim()) {
      showError(nameInput, nameError, 'Please enter your full name.');
      isValid = false;
    } else {
      clearError(nameInput, nameError);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showError(emailInput, emailError, 'Please enter your email address.');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, emailError, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    if (!isValid) return;
    alert('RSVP Confirmed! We look forward to seeing you.');

    console.log('RSVP Submitted:', {
      name       : nameInput.value.trim(),
      email      : emailInput.value.trim(),
      affiliation: document.getElementById('rsvp-affiliation').value.trim()
    });

    form.reset();
  });
}