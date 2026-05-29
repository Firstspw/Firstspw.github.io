document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('bg-video');
  const muteBtn = document.getElementById('muteButton');
  const startOverlay = document.getElementById('startOverlay');
  const mainContent = document.getElementById('mainContent');
  let isMuted = false;

  startOverlay.addEventListener('click', async () => {
    try {
      video.muted = false;
      await video.play();
    } catch (err) {
      video.muted = true;
      video.play();
    }
    startOverlay.classList.add('fade-out');
    setTimeout(() => {
      startOverlay.style.display = 'none';
      mainContent.classList.add('show');
    }, 1200);
  });

  muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    video.muted = isMuted;
    muteBtn.textContent = isMuted ? '🔇' : '🔊';
  });

  video.addEventListener('error', () => {
    video.load();
    video.play().catch(() => {});
  });

  // HUD clock
  const hudTime = document.getElementById('hudTime');
  function tick() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2,'0');
    const mm = String(now.getMinutes()).padStart(2,'0');
    const ss = String(now.getSeconds()).padStart(2,'0');
    if (hudTime) hudTime.textContent = `${hh}:${mm}:${ss}`;
  }
  tick();
  setInterval(tick, 1000);
});

// ─── Cursor glow ───
const glow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
  if (Math.random() < 0.1) spawnLeaf(e.clientX, e.clientY);
});

document.addEventListener('touchmove', (e) => {
  const t = e.touches[0];
  if (t && Math.random() < 0.3) spawnLeaf(t.clientX, t.clientY);
}, { passive: true });

document.addEventListener('touchstart', (e) => {
  const t = e.touches[0];
  if (t) spawnLeaf(t.clientX, t.clientY);
}, { passive: true });

// ─── Leaf ───
function spawnLeaf(x, y) {
  const leaf = document.createElement('div');
  leaf.className = 'leaf';
  leaf.style.left = (x + (Math.random() * 30 - 15)) + 'px';
  leaf.style.top  = y + 'px';
  document.body.appendChild(leaf);
  setTimeout(() => leaf.remove(), 1100);
}

// ─── Animated title ───
const fullText = '@FIRST';
let idx = 0, rev = false;
function animateTitle() {
  document.title = fullText.substring(0, idx);
  if (!rev) { idx++; if (idx > fullText.length) { rev = true; } }
  else       { idx--; if (idx < 1)              { rev = false; } }
  setTimeout(animateTitle, 280);
}
animateTitle();