# 🧠 Math Cerebro

A cool, minimalist mathematics riddle and logic puzzle game with 100 levels, inspired by sleek mobile games like *Math Riddle and Puzzle Game* (Black Games) and *Math Riddle and Puzzles* (Kyoz).

---

## ⚡ What Makes Math Cerebro Different

- **Cool & Minimalist Interface**:
  - Deep matte dark aesthetic matching the glowing neon brain logo.
  - Zero rainbow clutter and zero distracting background blur overlays.
  - **No Jarring Pop-ups on Correct Answer**: Answer bar flashes a clean success state, and an inline `Next Level →` banner seamlessly advances you to the next puzzle.
  - **No 3-Star System**: Pure focus on problem-solving. Progress is tracked cleanly via total solved count and minimal checkmarks.
- **100 Pure Math & Logic Riddles**:
  - **Zero essay questions or word stories** — strictly numbers, equations, bracket relations, matrices, and pattern logic.
  - **Challenging right from Level 1**:
    - Level 1 starts with $n \times (n+1)$ pattern relations (`2 = 6`, `3 = 12`, `4 = 20`, `5 = 30`, `6 = 42`).
    - Level 2: `1 + 4 = 5`, `2 + 5 = 12`, `3 + 6 = 21`, `8 + 11 = 96`.
    - Level 3: `7 [ 40 ] 3`, `9 [ 72 ] 3`, `8 [ 48 ] 4` (difference of squares).
    - Level 6: `61, 52, 63, 94, 46, 18` (reversed squares).
    - Level 8: `6 ÷ 2(1 + 2) = 9` (arithmetic order of operations).
- **Responsive 3D Tactile Keypad**:
  - On-screen number pad + hardware keyboard support (`0-9`, `Enter`, `Backspace`, `Escape`).
  - Automatically converts into multiple-choice options when a puzzle provides choices.
- **PWA-Ready & Offline First**:
  - Fully installable on Android, iOS, and Desktop with offline caching via Service Worker.

---

## 🎮 How to Run

1. Start the local server:
   ```bash
   node server.js
   ```
2. Open your browser at:
   ```
   http://localhost:3000/
   ```

---

## 🧪 Automated Test Suite

- **100 Levels Verification**:
  ```bash
  node tests/validate-levels.js
  ```
- **Navigation & Click Simulation**:
  ```bash
  node tests/verify-play-click.js
  ```
