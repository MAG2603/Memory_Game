const board = document.getElementById('game-board');
const attemptsSpan = document.getElementById('attempts');
const restartBtn = document.getElementById('restart-btn');

const emojis = ['🍎','🍌','🍇','🍉','🍒','🍋','🍓','🥝'];
let cards = [];
let flippedCards = [];
let matched = 0;
let attempts = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  cards = [];
  matched = 0;
  attempts = 0;
  attemptsSpan.textContent = attempts;
  board.innerHTML = '';
  const pairs = [...emojis, ...emojis];
  shuffle(pairs);
  pairs.forEach((emoji, idx) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.emoji = emoji;
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${emoji}</div>
      </div>
    `;
    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
    cards.push(card);
  });
}

function flipCard(card) {
  if (
    card.classList.contains('flipped') ||
    flippedCards.length === 2 ||
    card.classList.contains('matched')
  ) return;
  card.classList.add('flipped');
  flippedCards.push(card);
  if (flippedCards.length === 2) {
    attempts++;
    attemptsSpan.textContent = attempts;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matched += 2;
    flippedCards = [];
    if (matched === cards.length) {
      setTimeout(() => {
        winAnimation();
        setTimeout(() => {
          alert(`Selamat! Selesai dalam ${attempts} percobaan.`);
          createBoard();
        }, 900);
      }, 400);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 900);
  }
}

if (restartBtn) {
  restartBtn.addEventListener('click', (e) => {
    // Ripple effect
    const ripple = restartBtn.querySelector('.ripple');
    if (ripple) {
      ripple.style.transition = 'none';
      ripple.style.width = ripple.style.height = '0px';
      ripple.style.opacity = '0.5';
      setTimeout(() => {
        ripple.style.transition = '';
        ripple.style.width = ripple.style.height = '120px';
        ripple.style.opacity = '0';
      }, 10);
      setTimeout(() => {
        ripple.style.width = ripple.style.height = '0px';
        ripple.style.opacity = '0';
      }, 410);
    }
    createBoard();
    document.body.classList.remove('win-anim');
  });
}

function winAnimation() {
  document.body.classList.add('win-anim');
  setTimeout(() => {
    document.body.classList.remove('win-anim');
  }, 1200);
}

createBoard();

document.addEventListener('DOMContentLoaded', function() {
  const aboutToggle = document.getElementById('about-toggle');
  const aboutModal = document.getElementById('about-modal');
  const aboutClose = document.getElementById('about-close');

  if (aboutToggle && aboutModal && aboutClose) {
    aboutToggle.addEventListener('click', function() {
      aboutModal.classList.add('active');
    });
    aboutClose.addEventListener('click', function() {
      aboutModal.classList.remove('active');
    });
    aboutModal.addEventListener('click', function(e) {
      if (e.target === aboutModal) {
        aboutModal.classList.remove('active');
      }
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        aboutModal.classList.remove('active');
      }
    });
  }
});
