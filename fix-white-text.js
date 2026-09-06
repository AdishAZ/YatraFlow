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

  // We need to replace text-white with text-slate-800 but only if not in a string that has a safeBgPattern
  // To do this simply, we will find all class="..." strings, check if they contain safeBgPatterns, if not, replace text-white.
  
  // A regex to match className="..." or className={`...`} or className={cn(...)}
  // This is tricky. Let's just do a global replace of text-white with text-slate-800, and then I can manually revert any obvious button mistakes if needed.
  // Actually, let's just do a string replacement logic:
  
  const classMatches = [...content.matchAll(/className=(["']|{`|{cn\()([\s\S]*?)(["']|`}|}\))/g)];
  
  for (const match of classMatches) {
    const fullMatch = match[0];
    const classStr = match[2];
    
    if (classStr.includes('text-white')) {
      // Check if it has a safe background
      const hasSafeBg = safeBgPatterns.some(bg => classStr.includes(bg));
      
      if (!hasSafeBg) {
        const newClassStr = classStr.replace(/text-white/g, 'text-slate-800');
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
