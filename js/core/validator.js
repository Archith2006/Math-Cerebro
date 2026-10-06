/**
 * Answer Validator
 * Evaluates player input against puzzle answers, supporting multiple equivalent formats
 * (e.g., decimals/fractions, trimmed whitespace, case-insensitivity).
 */
class AnswerValidator {
  /**
   * Normalizes an answer string
   */
  static clean(str) {
    if (str === null || str === undefined) return '';
    return String(str).trim().toLowerCase().replace(/\s+/g, '');
  }

  /**
   * Evaluates if a string is a fraction like "1/2" or "3/4" and returns its float value
   */
  static parseNumber(str) {
    const s = this.clean(str);
    if (!s) return null;

    // Check fraction pattern
    if (/^-?\d+\/\d+$/.test(s)) {
      const parts = s.split('/');
      const denom = parseFloat(parts[1]);
      if (denom !== 0) {
        return parseFloat(parts[0]) / denom;
      }
    }

    // Check pure float or int
    const num = parseFloat(s);
    return isNaN(num) ? null : num;
  }

  /**
   * Validates if user input matches the puzzle's expected answer
   */
  static check(userInput, level) {
    if (!userInput || !level) return false;

    const cleanInput = this.clean(userInput);
    const cleanAnswer = this.clean(level.answer);

    // Direct match
    if (cleanInput === cleanAnswer) return true;

    // Check acceptable alternative answers array
    if (Array.isArray(level.acceptableAnswers)) {
      for (const alt of level.acceptableAnswers) {
        if (cleanInput === this.clean(alt)) return true;
      }
    }

    // Numeric comparison (handles 0.5 vs 1/2, or 25 vs 025)
    const inputNum = this.parseNumber(cleanInput);
    const ansNum = this.parseNumber(cleanAnswer);
    if (inputNum !== null && ansNum !== null) {
      if (Math.abs(inputNum - ansNum) < 0.0001) {
        return true;
      }
    }

    return false;
  }
}

window.AnswerValidator = AnswerValidator;
