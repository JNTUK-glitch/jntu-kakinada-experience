// ─── SCROLL REVEAL ───

// ─── PREMIUM SCROLL REVEAL ───
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${index * 0.08}s`;
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));

// ─── HAMBURGER ───
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// ─── ANIMATED COUNTERS ───
function animateCounter(el) {
  const target = el.dataset.target;
  const isInfinity = target === '∞';
  const hasPlus = target.includes('+');
  const hasRs = target.includes('₹');
  const num = parseInt(target.replace(/[^0-9]/g, ''));
  if (isInfinity) { el.textContent = '∞'; return; }
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const val = Math.floor(progress * num);
    el.textContent = (hasRs ? '₹' : '') + val.toLocaleString('en-IN') + (hasPlus ? '+' : '');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.animated) {
      e.target.dataset.animated = true;
      animateCounter(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));

// ─── FIQ ACCORDION ───
document.querySelectorAll('.fiq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains('open');
    document.querySelectorAll('.fiq-q').forEach(b => { b.classList.remove('open'); b.nextElementSibling.classList.remove('open'); });
    if (!isOpen) { btn.classList.add('open'); answer.classList.add('open'); }
  });
});

// ─── BINGO BOARD ───
const bingoItems = [
  "Schema not available", "Pay ₹100 for recounting", "Result is being processed",
  "This is university policy", "Submit written representation", "Evaluator is an expert",
  "Cannot share answer scripts", "Revaluation result same", "Try again next supply",
  "Office is closed today", "Your file is pending", "Contact your college",
  "FREE — You Failed Anyway", "Grace marks don't exist", "RTI? What RTI?",
  "We followed procedure", "Expert wasn't available", "Marks are finalised",
  "Diagram had extra line", "Word not in schema", "Pay ₹12,000 first",
  "Wrong derivation format", "Exactly correct = 0 marks", "6 years not enough?", "Result in 3 months"
];

const board = document.getElementById('bingo-board');
const status = document.getElementById('bingo-status');
if (board) {
  let marked = new Array(25).fill(false);
  marked[12] = true; // center always marked
  bingoItems.forEach((text, i) => {
    const cell = document.createElement('div');
    cell.className = 'bingo-cell' + (i === 12 ? ' center' : '');
    cell.textContent = text;
    cell.dataset.index = i;
    cell.addEventListener('click', () => {
      if (i === 12) return;
      marked[i] = !marked[i];
      cell.classList.toggle('marked', marked[i]);
      checkBingo();
    });
    board.appendChild(cell);
  });

  function checkBingo() {
    const lines = [
      [0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24],
      [0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24],
      [0,6,12,18,24],[4,8,12,16,20]
    ];
    const won = lines.some(line => line.every(i => marked[i]));
    status.textContent = won ? '🎉 BINGO! You have lived the JNTU experience.' : '';
  }
}
