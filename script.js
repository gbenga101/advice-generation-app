const API_URL = 'https://api.adviceslip.com/advice';

const adviceIdEl = document.getElementById('advice-id');
const adviceTextEl = document.getElementById('advice-text');
const diceBtn = document.getElementById('dice-btn');

async function getNewAdvice() {
  diceBtn.disabled = true;
  diceBtn.classList.add('is-loading');

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    adviceIdEl.textContent = data.slip.id;
    adviceTextEl.textContent = data.slip.advice;
  } catch (error) {
    // Keeps the failure visible in the console for debugging, and shows
    // the user something readable instead of a silently frozen card.
    console.error('Could not fetch advice:', error);
    adviceTextEl.textContent = "Couldn't fetch new advice right now — check your connection and try again.";
  } finally {
    diceBtn.disabled = false;
    diceBtn.classList.remove('is-loading');
  }
}

diceBtn.addEventListener('click', getNewAdvice);

getNewAdvice();
