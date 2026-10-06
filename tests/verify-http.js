const http = require('http');

http.get('http://localhost:3000/', (res) => {
  console.log('HTTP status:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Length:', data.length);
    console.log('Has MATH CEREBRO:', data.includes('MATH CEREBRO'));
    console.log('Has brand-brain-hero:', data.includes('brand-brain-hero'));
    console.log('Has levels-grid-5col:', data.includes('levels-grid-5col'));
    console.log('Has game-control-bar:', data.includes('game-control-bar'));
    console.log('Has keypad-grid-2x5:', data.includes('keypad-grid-2x5'));
  });
}).on('error', (err) => {
  console.error('HTTP request failed:', err.message);
});
