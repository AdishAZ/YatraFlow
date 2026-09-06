const fs = require('fs');
const path = require('path');

const dir = 'd:/Pilgrim/src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const safeBgPatterns = [
  'bg-primary',
  'bg-[#0E1A2B]',
  'bg-black',
  'bg-critical',
  'bg-warning',
  'bg-success',
  'bg-red-',
  'bg-blue-',
  'bg-emerald-',
  'bg-saffron-',
  'bg-orange-',
  'bg-amber-'
];

let filesModified = 0;

for (const file of files) {
  // Skip CrowdMonitoring and QueueManagement as we already fixed them
  if (file === 'CrowdMonitoring.tsx' || file === 'QueueManagement.tsx' || file === 'Dashboard.tsx' || file === 'TempleOperations.tsx') {
    continue;
  }

  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let newContent = content;

  const classMatches = [...content.matchAll(/className=(["']|{`|{cn\()([\s\S]*?)(["']|`}|}\))/g)];
  
  for (const match of classMatches) {
    const fullMatch = match[0];
    const classStr = match[2];
    
    if (classStr.includes('text-white')) {
      const hasSafeBg = safeBgPatterns.some(bg => classStr.includes(bg));
      
      if (!hasSafeBg) {
        const newClassStr = classStr.replace(/text-white/g, 'text-[#0E1A2B]');
        const replacedMatch = fullMatch.replace(classStr, newClassStr);
        newContent = newContent.replace(fullMatch, replacedMatch);
      }
    }
  }

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Updated ${file}`);
    filesModified++;
  }
}

console.log(`Done. Modified ${filesModified} files.`);
