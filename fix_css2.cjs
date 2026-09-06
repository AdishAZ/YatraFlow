const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace('.bg-[#0a1520]', '.bg-\\\\[\\\\#0a1520\\\\]')
         .replace('.bg-[#0E1A2B]', '.bg-\\\\[\\\\#0E1A2B\\\\]')
         .replace('.bg-[#0e1a2b]\/95', '.bg-\\\\[\\\\#0e1a2b\\\\]\\\\/95')
         .replace('.bg-[#0E1A2B]\/85', '.bg-\\\\[\\\\#0E1A2B\\\\]\\\\/85')
         .replace('.bg-[#0a1118]', '.bg-\\\\[\\\\#0a1118\\\\]')
         .replace('.bg-[#080c12]\/95', '.bg-\\\\[\\\\#080c12\\\\]\\\\/95')
         .replace('.bg-[#080c12]', '.bg-\\\\[\\\\#080c12\\\\]');

fs.writeFileSync('src/index.css', css);

