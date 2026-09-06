const fs = require('fs');
let content = fs.readFileSync('src/pages/GISMap.tsx', 'utf8');

content = content.replace(
  /className=\"flex-shrink-0 flex flex-col relative z-10\"\s+style={{ background: \'linear-gradient\(180deg, #0a1118 0%, #080c12 100%\)\' }}/,
  'className=\"gis-rail flex-shrink-0 flex flex-col relative z-10\"'
);

fs.writeFileSync('src/pages/GISMap.tsx', content);

