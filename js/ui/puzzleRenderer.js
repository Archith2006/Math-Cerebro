/**
 * Puzzle Renderer - Math Cerebro
 * Minimalist, high-end visual representations:
 * - Geometric Triangles (Inverted & Upright SVGs, matching Image 5)
 * - Circle Quadrants (Geometric 4-sector SVGs)
 * - Algebraic Equation Systems (Thin clean typography, matching Image 2/3)
 * - Matrix Grids (Clean numeric cells)
 * - Sequences & Bracket Relations
 * ZERO emojis, zero essay questions, 100% pure visual math.
 */
class PuzzleRenderer {
  static render(level, container) {
    if (!container || !level) return;
    container.innerHTML = '';

    switch (level.type) {
      case 'triangle_geometry':
        this.renderTriangleGeometry(level, container);
        break;
      case 'circle_geometry':
        this.renderCircleGeometry(level, container);
        break;
      case 'polygon_geometry':
        this.renderPolygonPerimeter(level, container);
        break;
      case 'count_shapes':
        this.renderCountShapes(level, container);
        break;
      case 'diamond_cluster':
        this.renderDiamondCluster(level, container);
        break;
      case 'star_radial':
        this.renderStarRadial(level, container);
        break;
      case 'equation_system':
      case 'symbol_algebra':
        this.renderEquationSystem(level, container);
        break;
      case 'pattern_relation':
      case 'bracket_relation':
        this.renderPatternRelation(level, container);
        break;
      case 'grid_matrix':
      case 'magic_math':
        this.renderGrid(level, container);
        break;
      case 'sequence':
        this.renderSequence(level, container);
        break;
      case 'logic_math':
      default:
        this.renderMathExpression(level, container);
        break;
    }
  }

  /**
   * Geometric Triangles (Inverted & Upright)
   * Matches Image 5: 3 inverted triangles with numbers at vertices
   * Triangle 1 (top-left), Triangle 2 (top-right), Triangle 3 (bottom-center)
   */
  static renderTriangleGeometry(level, container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'triangles-container';

    const isInverted = level.inverted !== false; // Default inverted like Image 5
    const triangles = level.triangles || [];

    // Row 1: First 2 triangles
    const row1 = document.createElement('div');
    row1.className = 'triangles-row';

    // Row 2: 3rd triangle (centered)
    const row2 = document.createElement('div');
    row2.className = 'triangles-row';

    triangles.forEach((tri, index) => {
      const svgBox = document.createElement('div');
      svgBox.className = 'single-triangle-wrap';
      svgBox.innerHTML = this.buildTriangleSVG(tri, isInverted);

      if (index < 2) {
        row1.appendChild(svgBox);
      } else {
        row2.appendChild(svgBox);
      }
    });

    wrapper.appendChild(row1);
    if (triangles.length > 2) {
      wrapper.appendChild(row2);
    }

    container.appendChild(wrapper);
  }

  static buildTriangleSVG(tri, isInverted) {
    // Width 130, Height 110 viewBox
    // Inverted triangle points: Top-Left (28, 22), Top-Right (102, 22), Bottom (65, 88)
    // Upright triangle points: Top (65, 22), Bottom-Left (28, 88), Bottom-Right (102, 88)
    if (isInverted) {
      const [tl, tr, b, center] = tri;
      const centerSVG = center !== undefined ? `<text x="65" y="48" text-anchor="middle" font-size="14" fill="#2ba6ff" font-family="'Outfit', sans-serif" font-weight="400">${center}</text>` : '';
      return `
        <svg viewBox="0 0 130 110" class="single-triangle-svg">
          <!-- Inverted Triangle Stroke -->
          <polygon points="28,24 102,24 65,86" fill="none" stroke="rgba(255, 255, 255, 0.45)" stroke-width="1.4" stroke-linejoin="round"/>
          <!-- Top-Left Vertex Number -->
          <text x="14" y="22" text-anchor="middle" font-size="16" fill="#f0f3f8" font-family="'Outfit', sans-serif" font-weight="300">${tl}</text>
          <!-- Top-Right Vertex Number -->
          <text x="116" y="22" text-anchor="middle" font-size="16" fill="#f0f3f8" font-family="'Outfit', sans-serif" font-weight="300">${tr}</text>
          <!-- Bottom Vertex Number -->
          <text x="65" y="104" text-anchor="middle" font-size="17" fill="${b === '?' ? '#2ba6ff' : '#f0f3f8'}" font-family="'Outfit', sans-serif" font-weight="${b === '?' ? '500' : '300'}">${b}</text>
          ${centerSVG}
        </svg>
      `;
    } else {
      const [t, bl, br, center] = tri;
      const centerSVG = center !== undefined ? `<text x="65" y="66" text-anchor="middle" font-size="14" fill="${center === '?' ? '#2ba6ff' : '#f0f3f8'}" font-family="'Outfit', sans-serif" font-weight="400">${center}</text>` : '';
      return `
        <svg viewBox="0 0 130 110" class="single-triangle-svg">
          <!-- Upright Triangle Stroke -->
          <polygon points="65,22 28,86 102,86" fill="none" stroke="rgba(255, 255, 255, 0.45)" stroke-width="1.4" stroke-linejoin="round"/>
          <!-- Top Vertex Number -->
          <text x="65" y="14" text-anchor="middle" font-size="16" fill="#f0f3f8" font-family="'Outfit', sans-serif" font-weight="300">${t}</text>
          <!-- Bottom-Left Vertex Number -->
          <text x="16" y="98" text-anchor="middle" font-size="16" fill="#f0f3f8" font-family="'Outfit', sans-serif" font-weight="300">${bl}</text>
          <!-- Bottom-Right Vertex Number -->
          <text x="114" y="98" text-anchor="middle" font-size="16" fill="#f0f3f8" font-family="'Outfit', sans-serif" font-weight="300">${br}</text>
          ${centerSVG}
        </svg>
      `;
    }
  }

  /**
   * Circle Geometry: Wheel 8-Sectors, 4 Bisected Circles, or 4-Quadrants
   */
  static renderCircleGeometry(level, container) {
    if (level.subType === 'wheel_8sector' || level.sectors) {
      this.renderWheel8Sector(level, container);
      return;
    }
    if (level.subType === 'bisected' || level.splitCircles) {
      this.renderBisectedCircles(level, container);
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'circles-container';

    const circles = level.circles || [];

    // Row 1: First 2 circles
    const row1 = document.createElement('div');
    row1.className = 'triangles-row';

    // Row 2: 3rd circle
    const row2 = document.createElement('div');
    row2.className = 'triangles-row';

    circles.forEach((c, index) => {
      const svgBox = document.createElement('div');
      svgBox.className = 'single-circle-wrap';
      svgBox.innerHTML = this.buildCircleSVG(c);

      if (index < 2) {
        row1.appendChild(svgBox);
      } else {
        row2.appendChild(svgBox);
      }
    });

    wrapper.appendChild(row1);
    if (circles.length > 2) {
      wrapper.appendChild(row2);
    }

    container.appendChild(wrapper);
  }

  static buildCircleSVG(c) {
    const [tl, tr, bl, br] = c;
    return `
      <svg viewBox="0 0 110 110" class="single-circle-svg" style="width: 105px; height: 105px;">
        <circle cx="55" cy="55" r="46" fill="none" stroke="rgba(255, 255, 255, 0.45)" stroke-width="1.4"/>
        <line x1="55" y1="9" x2="55" y2="101" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1"/>
        <line x1="9" y1="55" x2="101" y2="55" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1"/>
        <!-- Top-Left -->
        <text x="36" y="42" text-anchor="middle" font-size="15" fill="#f0f3f8" font-family="'Outfit', sans-serif" font-weight="300">${tl}</text>
        <!-- Top-Right -->
        <text x="74" y="42" text-anchor="middle" font-size="15" fill="#f0f3f8" font-family="'Outfit', sans-serif" font-weight="300">${tr}</text>
        <!-- Bottom-Left -->
        <text x="36" y="78" text-anchor="middle" font-size="15" fill="#f0f3f8" font-family="'Outfit', sans-serif" font-weight="300">${bl}</text>
        <!-- Bottom-Right -->
        <text x="74" y="78" text-anchor="middle" font-size="15" fill="${br === '?' ? '#2ba6ff' : '#f0f3f8'}" font-family="'Outfit', sans-serif" font-weight="${br === '?' ? '500' : '300'}">${br}</text>
      </svg>
    `;
  }

  /**
   * 8-Sector Circle Wheel (Black Games / Kyoz Style)
   */
  static renderWheel8Sector(level, container) {
    const sectors = level.sectors || [];
    const cx = 95, cy = 95, r = 80;

    let spokesSVG = '';
    for (let i = 0; i < 4; i++) {
      const angle = (i * 45) * Math.PI / 180;
      const x1 = cx - r * Math.cos(angle);
      const y1 = cy - r * Math.sin(angle);
      const x2 = cx + r * Math.cos(angle);
      const y2 = cy + r * Math.sin(angle);
      spokesSVG += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="rgba(255, 255, 255, 0.35)" stroke-width="1.3"/>`;
    }

    let textSVG = '';
    const textRadius = 52;
    sectors.forEach((val, i) => {
      const angle = (-112.5 + i * 45) * Math.PI / 180;
      const tx = cx + textRadius * Math.cos(angle);
      const ty = cy + textRadius * Math.sin(angle) + 5;
      const isMissing = val === '?' || val === '';
      const fill = isMissing ? '#2ba6ff' : '#f0f3f8';
      const weight = isMissing ? '600' : '300';
      const size = isMissing ? '21' : '16';
      textSVG += `<text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="middle" font-size="${size}" fill="${fill}" font-family="'Outfit', sans-serif" font-weight="${weight}">${val}</text>`;
    });

    const svg = `
      <svg viewBox="0 0 190 190" class="wheel-8sector-svg" style="width: 195px; height: 195px; filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.45));">
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.45)" stroke-width="1.6"/>
        <circle cx="${cx}" cy="${cy}" r="4" fill="rgba(255, 255, 255, 0.7)"/>
        ${spokesSVG}
        ${textSVG}
      </svg>
    `;

    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    wrapper.style.alignItems = 'center';
    wrapper.style.width = '100%';
    wrapper.innerHTML = svg;
    container.appendChild(wrapper);
  }

  /**
   * 4 Bisected Circles in 2x2 Matrix
   */
  static renderBisectedCircles(level, container) {
    const rawCircles = level.splitCircles || level.circles || [];
    const centers = [
      { cx: 58, cy: 58 },
      { cx: 152, cy: 58 },
      { cx: 58, cy: 152 },
      { cx: 152, cy: 152 }
    ];

    let circlesSVG = '';
    rawCircles.forEach((c, i) => {
      if (i >= 4) return;
      const { cx, cy } = centers[i];
      const leftVal = Array.isArray(c) ? c[0] : (c.left !== undefined ? c.left : c[0]);
      const rightVal = Array.isArray(c) ? c[1] : (c.right !== undefined ? c.right : c[1]);
      const r = 38;

      const isLeftMissing = leftVal === '?';
      const isRightMissing = rightVal === '?';

      circlesSVG += `
        <g>
          <circle cx="${cx}" cy="${cy}" r="${r}" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.35)" stroke-width="1.4"/>
          <line x1="${cx}" y1="${cy - r}" x2="${cx}" y2="${cy + r}" stroke="rgba(255, 255, 255, 0.22)" stroke-width="1.2"/>
          ${isLeftMissing ? `<circle cx="${cx - 17}" cy="${cy}" r="13" fill="rgba(56, 189, 248, 0.18)" stroke="#38bdf8" stroke-width="1.2"/>` : ''}
          ${isRightMissing ? `<circle cx="${cx + 17}" cy="${cy}" r="13" fill="rgba(56, 189, 248, 0.18)" stroke="#38bdf8" stroke-width="1.2"/>` : ''}
          <text x="${cx - 17}" y="${cy + 6}" text-anchor="middle" font-size="${isLeftMissing ? '18' : '15'}" fill="${isLeftMissing ? '#38bdf8' : '#f0f3f8'}" font-family="'Outfit', sans-serif" font-weight="${isLeftMissing ? '600' : '400'}">${leftVal}</text>
          <text x="${cx + 17}" y="${cy + 6}" text-anchor="middle" font-size="${isRightMissing ? '18' : '15'}" fill="${isRightMissing ? '#38bdf8' : '#f0f3f8'}" font-family="'Outfit', sans-serif" font-weight="${isRightMissing ? '600' : '400'}">${rightVal}</text>
        </g>
      `;
    });

    const svg = `
      <svg viewBox="0 0 210 210" class="bisected-circles-svg" style="width: 200px; height: 200px; filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.35));">
        ${circlesSVG}
      </svg>
    `;

    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    wrapper.style.alignItems = 'center';
    wrapper.style.width = '100%';
    wrapper.innerHTML = svg;
    container.appendChild(wrapper);
  }

  /**
   * Polygon Perimeter Geometry: Hexagon (6 sides) or Octagon (8 sides)
   */
  static renderPolygonPerimeter(level, container) {
    const sides = level.sides || [];
    const n = sides.length;
    const shape = level.shape || (n === 8 ? 'octagon' : 'hexagon');
    const centerVal = level.center;

    const cx = 105, cy = 105;
    const r = n === 8 ? 68 : 66;

    const vertices = [];
    const angleOffset = -Math.PI / 2 - Math.PI / n;
    for (let i = 0; i < n; i++) {
      const a = angleOffset + (i * 2 * Math.PI / n);
      vertices.push({
        x: cx + r * Math.cos(a),
        y: cy + r * Math.sin(a)
      });
    }

    const pointsStr = vertices.map(v => `${v.x.toFixed(1)},${v.y.toFixed(1)}`).join(' ');

    let sideNumbersSVG = '';
    const textOffset = n === 8 ? 16 : 18;
    for (let i = 0; i < n; i++) {
      const v1 = vertices[i];
      const v2 = vertices[(i + 1) % n];
      const midX = (v1.x + v2.x) / 2;
      const midY = (v1.y + v2.y) / 2;

      const dx = midX - cx;
      const dy = midY - cy;
      const len = Math.sqrt(dx * dx + dy * dy);
      const nx = dx / len;
      const ny = dy / len;

      const tx = midX + nx * textOffset;
      const ty = midY + ny * textOffset + 5;

      const val = sides[i];
      const isMissing = val === '?';
      sideNumbersSVG += `
        <text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="middle" font-size="${isMissing ? '19' : '15'}" fill="${isMissing ? '#2ba6ff' : '#f0f3f8'}" font-family="'Outfit', sans-serif" font-weight="${isMissing ? '600' : '300'}">${val}</text>
      `;
    }

    let centerSVG = '';
    if (centerVal !== undefined) {
      const isCenterMissing = centerVal === '?';
      centerSVG = `
        <circle cx="${cx}" cy="${cy}" r="18" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.25)" stroke-width="1"/>
        <text x="${cx}" y="${cy + 6}" text-anchor="middle" font-size="${isCenterMissing ? '20' : '17'}" fill="${isCenterMissing ? '#2ba6ff' : '#f0f3f8'}" font-family="'Outfit', sans-serif" font-weight="${isCenterMissing ? '600' : '400'}">${centerVal}</text>
      `;
    }

    const svg = `
      <svg viewBox="0 0 210 210" class="polygon-perimeter-svg" style="width: 205px; height: 205px; filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.45));">
        <polygon points="${pointsStr}" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.45)" stroke-width="1.5" stroke-linejoin="round"/>
        ${sideNumbersSVG}
        ${centerSVG}
      </svg>
    `;

    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    wrapper.style.alignItems = 'center';
    wrapper.style.width = '100%';
    wrapper.innerHTML = svg;
    container.appendChild(wrapper);
  }

  /**
   * Geometric Counting: Count squares / triangles
   */
  static renderCountShapes(level, container) {
    const example = level.example || { size: 2, count: 5 };
    const target = level.target || { size: 3, count: '?' };

    const wrapper = document.createElement('div');
    wrapper.className = 'count-shapes-container';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '18px';
    wrapper.style.width = '100%';

    const makeGridSVG = (size, count) => {
      const boxSize = size === 2 ? 68 : 92;
      const step = boxSize / size;
      let gridLines = '';
      for (let i = 1; i < size; i++) {
        const pos = (i * step).toFixed(1);
        gridLines += `<line x1="${pos}" y1="0" x2="${pos}" y2="${boxSize}" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1.2"/>`;
        gridLines += `<line x1="0" y1="${pos}" x2="${boxSize}" y2="${pos}" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1.2"/>`;
      }
      const isMissing = count === '?';
      return `
        <div class="count-shape-row">
          <svg width="${boxSize}" height="${boxSize}" viewBox="0 0 ${boxSize} ${boxSize}" class="count-shape-svg">
            <rect x="0" y="0" width="${boxSize}" height="${boxSize}" rx="4" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.45)" stroke-width="1.5"/>
            ${gridLines}
          </svg>
          <span class="count-shape-equal">=</span>
          <span class="count-shape-num ${isMissing ? 'missing' : ''}">${count}</span>
        </div>
      `;
    };

    const makeTriangleGridSVG = (size, count) => {
      const w = size === 2 ? 88 : 118;
      const h = size === 2 ? 76 : 102;
      const pad = 4;
      const topY = pad;
      const bottomY = h - pad;
      const cx = w / 2;
      const leftX = pad;
      const rightX = w - pad;

      let innerLines = '';
      const N = size;
      // 1. Horizontal lines
      for (let i = 1; i < N; i++) {
        const frac = i / N;
        const y = topY + frac * (bottomY - topY);
        const x1 = cx - frac * (cx - leftX);
        const x2 = cx + frac * (rightX - cx);
        innerLines += `<line x1="${x1.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y.toFixed(1)}" stroke="rgba(255, 255, 255, 0.32)" stroke-width="1.2"/>`;
      }

      // 2. Lines parallel to left side (connect base to right side)
      for (let k = 1; k < N; k++) {
        const frac = k / N;
        const bx = leftX + frac * (rightX - leftX);
        const by = bottomY;
        const rx = cx + frac * (rightX - cx);
        const ry = topY + frac * (bottomY - topY);
        innerLines += `<line x1="${bx.toFixed(1)}" y1="${by.toFixed(1)}" x2="${rx.toFixed(1)}" y2="${ry.toFixed(1)}" stroke="rgba(255, 255, 255, 0.32)" stroke-width="1.2"/>`;
      }

      // 3. Lines parallel to right side (connect left side to base)
      for (let k = 1; k < N; k++) {
        const frac = k / N;
        const lx = cx - frac * (cx - leftX);
        const ly = topY + frac * (bottomY - topY);
        const bx = leftX + (1 - frac) * (rightX - leftX);
        const by = bottomY;
        innerLines += `<line x1="${lx.toFixed(1)}" y1="${ly.toFixed(1)}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" stroke="rgba(255, 255, 255, 0.32)" stroke-width="1.2"/>`;
      }

      const isMissing = count === '?';
      return `
        <div class="count-shape-row">
          <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" class="count-shape-svg">
            <polygon points="${cx.toFixed(1)},${topY.toFixed(1)} ${leftX.toFixed(1)},${bottomY.toFixed(1)} ${rightX.toFixed(1)},${bottomY.toFixed(1)}" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.45)" stroke-width="1.6" stroke-linejoin="round"/>
            ${innerLines}
          </svg>
          <span class="count-shape-equal">=</span>
          <span class="count-shape-num ${isMissing ? 'missing' : ''}">${count}</span>
        </div>
      `;
    };

    const makeFn = level.countType === 'triangles' ? makeTriangleGridSVG : makeGridSVG;
    wrapper.innerHTML = `
      ${makeFn(example.size, example.count)}
      ${makeFn(target.size, target.count)}
    `;

    container.appendChild(wrapper);
  }

  /**
   * Diamond Cluster: 3 Floating Frosted Glass Diamonds in V-Formation (Matches Image 6)
   */
  static renderDiamondCluster(level, container) {
    const diamonds = level.diamonds || [];
    const wrapper = document.createElement('div');
    wrapper.className = 'diamond-cluster-vwrap';

    const topRow = document.createElement('div');
    topRow.className = 'diamond-cluster-row top-row';

    const bottomRow = document.createElement('div');
    bottomRow.className = 'diamond-cluster-row bottom-row';

    diamonds.forEach((d, i) => {
      if (i >= 3) return;
      const card = document.createElement('div');
      card.className = 'glass-diamond-box';

      const isTopMissing = d.top === '?';
      const isRightMissing = d.right === '?';
      const isBottomMissing = d.bottom === '?';
      const isLeftMissing = d.left === '?';

      card.innerHTML = `
        <div class="diamond-quad top ${isTopMissing ? 'missing' : ''}">
          <span class="diamond-val">${d.top !== undefined ? d.top : ''}</span>
        </div>
        <div class="diamond-quad right ${isRightMissing ? 'missing' : ''}">
          <span class="diamond-val">${d.right !== undefined ? d.right : ''}</span>
        </div>
        <div class="diamond-quad left ${isLeftMissing ? 'missing' : ''}">
          <span class="diamond-val">${d.left !== undefined ? d.left : ''}</span>
        </div>
        <div class="diamond-quad bottom ${isBottomMissing ? 'missing' : ''}">
          <span class="diamond-val">${d.bottom !== undefined ? d.bottom : ''}</span>
        </div>
      `;

      if (i < 2) {
        topRow.appendChild(card);
      } else {
        bottomRow.appendChild(card);
      }
    });

    wrapper.appendChild(topRow);
    wrapper.appendChild(bottomRow);
    container.appendChild(wrapper);
  }

  /**
   * Star Radial: Clean Frosted Glass Radial Dial
   */
  static renderStarRadial(level, container) {
    const rays = level.rays || [];
    const n = rays.length;
    const cx = 105, cy = 105;
    const innerRadius = 36;
    const outerRadius = 80;

    let linesSVG = '';
    const numLines = Math.floor(n / 2);
    for (let i = 0; i < numLines; i++) {
      const angle = (i * Math.PI / numLines) - Math.PI / 2;
      const x1 = cx + (outerRadius + 14) * Math.cos(angle);
      const y1 = cy + (outerRadius + 14) * Math.sin(angle);
      const x2 = cx - (outerRadius + 14) * Math.cos(angle);
      const y2 = cy - (outerRadius + 14) * Math.sin(angle);
      linesSVG += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="rgba(255, 255, 255, 0.22)" stroke-width="1.2"/>`;
    }

    let numbersSVG = '';
    rays.forEach((r, i) => {
      const angle = (i * 2 * Math.PI / n) - Math.PI / 2;
      if (r.inner !== undefined) {
        const ix = cx + innerRadius * Math.cos(angle);
        const iy = cy + innerRadius * Math.sin(angle);
        const isMissing = r.inner === '?';
        numbersSVG += `
          <circle cx="${ix.toFixed(1)}" cy="${iy.toFixed(1)}" r="12" fill="${isMissing ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.08)'}" stroke="${isMissing ? '#38bdf8' : 'rgba(255, 255, 255, 0.3)'}" stroke-width="${isMissing ? '1.5' : '1'}"/>
          <text x="${ix.toFixed(1)}" y="${(iy + 4.5).toFixed(1)}" text-anchor="middle" font-size="${isMissing ? '16' : '13'}" fill="${isMissing ? '#38bdf8' : '#f0f3f8'}" font-family="'Outfit', sans-serif" font-weight="${isMissing ? '600' : '400'}">${r.inner}</text>
        `;
      }
      if (r.outer !== undefined) {
        const ox = cx + outerRadius * Math.cos(angle);
        const oy = cy + outerRadius * Math.sin(angle);
        const isMissing = r.outer === '?';
        numbersSVG += `
          <circle cx="${ox.toFixed(1)}" cy="${oy.toFixed(1)}" r="14" fill="${isMissing ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.08)'}" stroke="${isMissing ? '#38bdf8' : 'rgba(255, 255, 255, 0.35)'}" stroke-width="${isMissing ? '1.6' : '1'}"/>
          <text x="${ox.toFixed(1)}" y="${(oy + 5).toFixed(1)}" text-anchor="middle" font-size="${isMissing ? '18' : '15'}" fill="${isMissing ? '#38bdf8' : '#ffffff'}" font-family="'Outfit', sans-serif" font-weight="${isMissing ? '700' : '400'}">${r.outer}</text>
        `;
      }
    });

    const svg = `
      <svg viewBox="0 0 210 210" class="star-radial-svg" style="width: 205px; height: 205px; filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.35));">
        <!-- Concentric Glass Orbit Rings -->
        <circle cx="${cx}" cy="${cy}" r="${outerRadius}" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.18)" stroke-width="1.2"/>
        <circle cx="${cx}" cy="${cy}" r="${innerRadius}" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.22)" stroke-width="1" stroke-dasharray="3,3"/>
        <!-- Glass Center Crystal Hub -->
        <circle cx="${cx}" cy="${cy}" r="7" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(255, 255, 255, 0.4)" stroke-width="1.2"/>
        <circle cx="${cx}" cy="${cy}" r="2.5" fill="#ffffff"/>
        ${linesSVG}
        ${numbersSVG}
      </svg>
    `;

    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    wrapper.style.alignItems = 'center';
    wrapper.style.width = '100%';
    wrapper.innerHTML = svg;
    container.appendChild(wrapper);
  }

  /**
   * Equation System - Thin Clean Typography (Matches Image 2 & 3)
   */
  static renderEquationSystem(level, container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'equation-system';

    const lines = level.question.split('\n');
    lines.forEach((line) => {
      const row = document.createElement('div');
      row.className = 'equation-row';
      const cleanLine = line.trim();
      if (cleanLine.includes('?')) {
        row.classList.add('target-row');
      }

      const formattedHTML = cleanLine
        .replace(/□/g, '<span class="geom-symbol square">□</span>')
        .replace(/○/g, '<span class="geom-symbol circle">○</span>')
        .replace(/△/g, '<span class="geom-symbol triangle">△</span>')
        .replace(/◇/g, '<span class="geom-symbol diamond">◇</span>')
        .replace(/⬡/g, '<span class="geom-symbol hexagon">⬡</span>');

      row.innerHTML = formattedHTML;
      wrapper.appendChild(row);
    });

    container.appendChild(wrapper);
  }

  /**
   * Pattern Relation: e.g. "2 = 6\n3 = 12\n4 = 20\n6 = ?" or "7 [ 40 ] 3"
   */
  static renderPatternRelation(level, container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'equation-system';

    const lines = level.question.split('\n');
    lines.forEach((line) => {
      const row = document.createElement('div');
      row.className = 'equation-row';
      const cleanLine = line.trim();
      if (cleanLine.includes('?')) {
        row.classList.add('target-row');
      }
      row.textContent = cleanLine;
      wrapper.appendChild(row);
    });

    container.appendChild(wrapper);
  }

  /**
   * Pure Math Expression: e.g. "4 × 4 + 4 × 4 + 4 - 4 × 4 = ?"
   */
  static renderMathExpression(level, container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'equation-system';

    const lines = (level.question || '').split('\n');
    lines.forEach((line) => {
      const row = document.createElement('div');
      row.className = 'equation-row';
      row.textContent = line.trim();
      wrapper.appendChild(row);
    });

    container.appendChild(wrapper);
  }

  /**
   * Sequence: e.g. "61, 52, 63, 94, 46, ?"
   */
  static renderSequence(level, container) {
    const seqWrapper = document.createElement('div');
    seqWrapper.className = 'clean-sequence';

    const items = level.question.split(/,\s*/);
    items.forEach((item, idx) => {
      const span = document.createElement('span');
      const val = item.trim();
      if (val === '?' || val.includes('?')) {
        span.className = 'missing';
        span.textContent = '?';
      } else {
        span.textContent = val + (idx < items.length - 1 ? ',' : '');
      }
      seqWrapper.appendChild(span);
    });

    container.appendChild(seqWrapper);
  }

  /**
   * Grid Matrix: 3x3 or 2x3 numeric cells
   */
  static renderGrid(level, container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'matrix-grid-box';

    let gridData = level.grid;
    if (!gridData && typeof level.question === 'string') {
      gridData = level.question.split('\n').map((row) => row.trim().split(/\s*\|\s*|\s+/));
    }

    if (Array.isArray(gridData)) {
      const cols = gridData[0] ? gridData[0].length : 3;
      wrapper.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

      gridData.forEach((row) => {
        row.forEach((cellVal) => {
          const cell = document.createElement('div');
          cell.className = 'matrix-cell';
          const val = String(cellVal).trim();
          if (val === '?' || val === '') {
            cell.classList.add('missing');
            cell.textContent = '?';
          } else {
            cell.textContent = val;
          }
          wrapper.appendChild(cell);
        });
      });
    }

    container.appendChild(wrapper);
  }
}

if (typeof window !== 'undefined') {
  window.PuzzleRenderer = PuzzleRenderer;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PuzzleRenderer;
  if (typeof global !== 'undefined') {
    global.PuzzleRenderer = PuzzleRenderer;
  }
}
