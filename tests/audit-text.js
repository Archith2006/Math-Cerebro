const levels = require('../js/data/levels.js');

console.log('Auditing 100 levels for text questions and options arrays:');
const issues = [];

levels.forEach((l) => {
  if (l.options && l.options.length > 0) {
    issues.push(`Level ${l.id} has options: ${JSON.stringify(l.options)}`);
  }
  const q = l.question.toLowerCase();
  const wordKeywords = ['what', 'which', 'how', 'move', 'matchstick', 'clock', 'angle', 'degree', 'hand', 'overlap', 'find', 'calculate', 'between', 'become'];
  const hasWord = wordKeywords.some((w) => {
    const regex = new RegExp(`\\b${w}\\b`, 'i');
    return regex.test(q);
  });
  if (hasWord) {
    issues.push(`Level ${l.id} has word question: "${l.question.replace(/\n/g, ' ')}"`);
  }
});

if (issues.length === 0) {
  console.log('All 100 levels are pure math riddles with NO word questions and NO options!');
} else {
  console.log(`Found ${issues.length} issues:`);
  issues.forEach((i) => console.log(' - ' + i));
}
