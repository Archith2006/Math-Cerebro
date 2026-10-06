/**
 * Visual & Haptic Effects Manager
 * Handles particle confetti bursts, shake animations, and haptic feedback.
 */
class EffectsManager {
  constructor() {
    this.canvas = document.getElementById('confetti-canvas');
    this.ctx = (this.canvas && typeof this.canvas.getContext === 'function') ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animating = false;

    if (this.canvas) {
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
    }
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  triggerConfetti() {
    if (!this.canvas || !this.ctx) return;
    this.resizeCanvas();
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#3b82f6'];
    this.particles = [];

    const count = 90;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 100,
        y: this.canvas.height / 2 + (Math.random() - 0.5) * 50,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 1.2) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        life: 0
      });
    }

    if (!this.animating) {
      this.animating = true;
      this.loopConfetti();
    }
  }

  loopConfetti() {
    if (!this.animating || !this.ctx) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.rotationSpeed;
      p.life++;
      if (p.life > 60) {
        p.opacity -= 0.025;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      this.ctx.restore();
    }

    this.particles = this.particles.filter((p) => p.opacity > 0 && p.y < this.canvas.height + 20);

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.loopConfetti());
    } else {
      this.animating = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  shake(element) {
    if (!element) return;
    element.classList.remove('shake');
    // Force reflow
    void element.offsetWidth;
    element.classList.add('shake');
    setTimeout(() => {
      element.classList.remove('shake');
    }, 500);
  }

  vibrate(ms = 60) {
    if (window.gameStorage && !window.gameStorage.getSetting('vibration')) return;
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(ms);
      } catch (e) {}
    }
  }
}

window.effects = new EffectsManager();
