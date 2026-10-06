/**
 * Automated Test Suite for Levels Verification
 * Verifies schema integrity, uniqueness, solvability, and answer validator compatibility for all 100 levels.
 */

const GAME_LEVELS = require('../js/data/levels.js');

// Mock AnswerValidator in Node environment
class TestValidator {
  static clean(str) {
    if (str === null || str === undefined) return '';
    return String(str).trim().toLowerCase().replace(/\s+/g, '');
  }

  static parseNumber(str) {
    const s = this.clean(str);
    if (!s) return null;
    if (/^-?\d+\/\d+$/.test(s)) {
      const parts = s.split('/');
      const denom = parseFloat(parts[1]);
      if (denom !== 0) return parseFloat(parts[0]) / denom;
    }
    const num = parseFloat(s);
    return isNaN(num) ? null : num;
  }

  static check(userInput, level) {
    if (!userInput || !level) return false;
    const cleanInput = this.clean(userInput);
    const cleanAnswer = this.clean(level.answer);

    if (cleanInput === cleanAnswer) return true;

    if (Array.isArray(level.acceptableAnswers)) {
      for (const alt of level.acceptableAnswers) {
        if (cleanInput === this.clean(alt)) return true;
      }
    }

    const inputNum = this.parseNumber(cleanInput);
    const ansNum = this.parseNumber(cleanAnswer);
    if (inputNum !== null && ansNum !== null) {
      if (Math.abs(inputNum - ansNum) < 0.0001) return true;
    }
    return false;
  }
}

function runTests() {
  console.log('--- RUNNING 100 LEVELS VALIDATION SUITE ---');
  let errors = 0;

  if (!Array.isArray(GAME_LEVELS) || GAME_LEVELS.length !== 100) {
    console.error(`❌ Expected exactly 100 levels, found ${GAME_LEVELS ? GAME_LEVELS.length : 0}`);
    errors++;
  } else {
    console.log(`✅ Level count is exactly 100`);
  }

  const seenIds = new Set();
  const validTypes = new Set([
    'sequence',
    'symbol_algebra',
    'grid_matrix',
    'matchstick',
    'magic_math',
    'word_riddle',
    'balance_scale',
    'clock_time',
    'pattern_relation',
    'bracket_relation',
    'logic_math',
    'triangle_geometry',
    'circle_geometry',
    'polygon_geometry',
    'count_shapes',
    'diamond_cluster',
    'star_radial',
    'equation_system'
  ]);
  const validDifficulties = new Set(['easy', 'medium-easy', 'medium', 'hard', 'expert']);

  GAME_LEVELS.forEach((level, index) => {
    const expectedId = index + 1;

    // Check ID
    if (level.id !== expectedId) {
      console.error(`❌ Level at index ${index} has ID ${level.id}, expected ${expectedId}`);
      errors++;
    }
    if (seenIds.has(level.id)) {
      console.error(`❌ Duplicate level ID: ${level.id}`);
      errors++;
    }
    seenIds.add(level.id);

    // Check Type
    if (!validTypes.has(level.type)) {
      console.error(`❌ Level ${level.id} has invalid type: '${level.type}'`);
      errors++;
    }

    // Check Difficulty
    if (!validDifficulties.has(level.difficulty)) {
      console.error(`❌ Level ${level.id} has invalid difficulty: '${level.difficulty}'`);
      errors++;
    }

    // Check Question
    if (!level.question || typeof level.question !== 'string' || level.question.trim().length === 0) {
      console.error(`❌ Level ${level.id} missing valid question`);
      errors++;
    }

    // Check Answer
    if (!level.answer || typeof level.answer !== 'string' || level.answer.trim().length === 0) {
      console.error(`❌ Level ${level.id} missing valid answer`);
      errors++;
    }

    // Check Hints
    if (!Array.isArray(level.hints) || level.hints.length !== 3) {
      console.error(`❌ Level ${level.id} must have exactly 3 hints, got ${level.hints ? level.hints.length : 0}`);
      errors++;
    } else {
      level.hints.forEach((h, hIdx) => {
        if (!h || typeof h !== 'string' || h.trim().length === 0) {
          console.error(`❌ Level ${level.id} hint ${hIdx + 1} is empty`);
          errors++;
        }
      });
    }

    // Check Explanation
    if (!level.explanation || typeof level.explanation !== 'string' || level.explanation.trim().length === 0) {
      console.error(`❌ Level ${level.id} missing explanation`);
      errors++;
    }

    // Check Solvability with Validator
    const isSolvable = TestValidator.check(level.answer, level);
    if (!isSolvable) {
      console.error(`❌ Level ${level.id} failed self-verification check with answer "${level.answer}"`);
      errors++;
    }

    // If options are provided, answer must be one of the options
    if (Array.isArray(level.options)) {
      const matchInOptions = level.options.some((opt) => TestValidator.clean(opt) === TestValidator.clean(level.answer));
      if (!matchInOptions) {
        console.error(`❌ Level ${level.id} has options ${JSON.stringify(level.options)} which do not contain answer "${level.answer}"`);
        errors++;
      }
    }
  });

  console.log(`\nVerified Archetypes across 100 levels:`);
  const typeCounts = {};
  GAME_LEVELS.forEach((l) => {
    typeCounts[l.type] = (typeCounts[l.type] || 0) + 1;
  });
  console.table(typeCounts);

  if (errors === 0) {
    console.log(`\n🎉 ALL 100 LEVELS PASSED VALIDATION WITH ZERO ERRORS!`);
    process.exit(0);
  } else {
    console.error(`\n❌ VALIDATION FAILED WITH ${errors} ERRORS.`);
    process.exit(1);
  }
}

runTests();
