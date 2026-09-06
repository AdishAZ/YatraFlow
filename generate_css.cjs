const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

// Remove everything after '/* GISMap Light Mode Overrides */' to clean up our mess
const idx = css.indexOf('/* GISMap Light Mode Overrides */');
if (idx !== -1) {
    css = css.substring(0, idx);
}

// Add the correct, properly escaped CSS
const newCss = \
/* GISMap Light Mode Overrides */
html:not(.dark) .gis-map-wrapper {
  background-color: #F8FAFC !important;
}

html:not(.dark) .gis-rail {
  background: white !important;
  border-right: 1px solid #E5E7EB;
}

html.dark .gis-map-wrapper {
  background-color: #080c12 !important;
}

html.dark .gis-rail {
  background: linear-gradient(180deg, #0a1118 0%, #080c12 100%) !important;
}

html:not(.dark) .gis-map-wrapper .bg-\\\\[\\\\#0a1520\\\\],
html:not(.dark) .gis-map-wrapper .bg-\\\\[\\\\#0E1A2B\\\\],
html:not(.dark) .gis-map-wrapper .bg-\\\\[\\\\#0E1A2B\\\\]\\\\/85,
html:not(.dark) .gis-map-wrapper .bg-\\\\[\\\\#0e1a2b\\\\]\\\\/95,
html:not(.dark) .gis-map-wrapper .bg-\\\\[\\\\#0a1118\\\\] {
  background-color: white !important;
}

html:not(.dark) .gis-map-wrapper .bg-\\\\[\\\\#080c12\\\\]\\\\/95,
html:not(.dark) .gis-map-wrapper .bg-\\\\[\\\\#080c12\\\\] {
  background-color: #F1F5F9 !important;
}

html:not(.dark) .gis-map-wrapper .text-white {
  color: #0F172A !important;
}
html:not(.dark) .gis-map-wrapper .text-slate-200,
html:not(.dark) .gis-map-wrapper .text-slate-300,
html:not(.dark) .gis-map-wrapper .text-slate-400 {
  color: #475569 !important;
}

html:not(.dark) .gis-map-wrapper .border-white\\\\/5,
html:not(.dark) .gis-map-wrapper .border-white\\\\/8,
html:not(.dark) .gis-map-wrapper .border-white\\\\/10,
html:not(.dark) .gis-map-wrapper .border-white\\\\/15,
html:not(.dark) .ring-white\\\\/10 {
  border-color: #E5E7EB !important;
  --tw-ring-color: #E5E7EB !important;
}

/* Ensure emergency sirens and pills don't get white backgrounds in light mode */
html:not(.dark) .gis-map-wrapper .bg-red-900\\\\/85 {
  background-color: #FEE2E2 !important;
  border-color: #FCA5A5 !important;
  color: #991B1B !important;
}
html:not(.dark) .gis-map-wrapper .bg-orange-900\\\\/85 {
  background-color: #FFEDD5 !important;
  border-color: #FDBA74 !important;
  color: #9A3412 !important;
}
\;

fs.writeFileSync('src/index.css', css + newCss);

