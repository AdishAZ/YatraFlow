const fs = require('fs');
let content = fs.readFileSync('src/pages/GISMap.tsx', 'utf8');

content = content.replace(
  'className=\"-m-6 w-[calc(100%+3rem)] h-[calc(100%+3rem)] flex text-slate-800 bg-[#080c12] overflow-hidden\"',
  'className=\"gis-map-wrapper -m-6 w-[calc(100%+3rem)] h-[calc(100%+3rem)] flex text-slate-800 overflow-hidden\"'
);

content = content.replace(
  'className=\"flex-shrink-0 flex flex-col relative z-10\"\\n          style={{ background: \'linear-gradient(180deg, #0a1118 0%, #080c12 100%)\' }}',
  'className=\"gis-rail flex-shrink-0 flex flex-col relative z-10\"'
);

fs.writeFileSync('src/pages/GISMap.tsx', content);

