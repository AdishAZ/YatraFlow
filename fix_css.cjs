const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(/\\.bg-\\[#0a1520\\]/g, '.bg-\\\\[\\\\#0a1520\\\\]')
         .replace(/\\.bg-\\[#0E1A2B\\]/g, '.bg-\\\\[\\\\#0E1A2B\\\\]')
         .replace(/\\.bg-\\[#0e1a2b\\]/g, '.bg-\\\\[\\\\#0e1a2b\\\\]')
         .replace(/\\.bg-\\[#0a1118\\]/g, '.bg-\\\\[\\\\#0a1118\\\\]')
         .replace(/\\.bg-\\[#080c12\\]/g, '.bg-\\\\[\\\\#080c12\\\\]');

fs.writeFileSync('src/index.css', css);

