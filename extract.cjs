const fs = require('fs');
const path = 'C:\\Users\\sj782\\.gemini\\antigravity\\brain\\f97532c0-4df2-44e3-9c0a-48f0390c5dcd\\.system_generated\\logs\\transcript_full.jsonl';
const lines = fs.readFileSync(path, 'utf-8').split('\n');
const outDir = 'd:\\Pilgrim\\src\\restore_temp';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

let found = {};
for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.tool_calls) {
      for (const call of obj.tool_calls) {
        if (call.name === 'default_api:write_to_file' || call.name === 'write_to_file') {
          const args = call.args;
          if (args && args.TargetFile && args.CodeContent) {
            const filename = require('path').basename(args.TargetFile).toLowerCase();
            const targets = ['gismap.tsx', 'vectorcampusviewer.tsx', 'campusgeometry.ts', 'aipipelinedrawer.tsx', 'cctvinspectiondrawer.tsx', 'minicommandwidget.tsx'];
            if (targets.includes(filename)) {
                found[filename] = args.CodeContent;
            }
          }
        }
      }
    }
  } catch(e) {}
}

for (const [name, content] of Object.entries(found)) {
    fs.writeFileSync(outDir + '\\\\' + name, content);
    console.log('Restored to temp:', name);
}
