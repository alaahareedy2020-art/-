const fs = require('fs');
const path = require('path');

// 1. Create dist directory
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
}
fs.mkdirSync(distPath);

// 2. Read and modify app.js
const appJsPath = path.join(__dirname, 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (supabaseUrl && supabaseKey) {
    appJs = appJs.replace(/SUPABASE_URL_PLACEHOLDER/g, supabaseUrl);
    appJs = appJs.replace(/SUPABASE_KEY_PLACEHOLDER/g, supabaseKey);
    console.log('Build: Supabase environment variables injected.');
} else {
    console.log('Build: No environment variables found, using local defaults.');
}

// 3. Write modified app.js to dist
fs.writeFileSync(path.join(distPath, 'app.js'), appJs);

// 4. Copy index.html and index.css to dist
fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(distPath, 'index.html'));
fs.copyFileSync(path.join(__dirname, 'index.css'), path.join(distPath, 'index.css'));

// 5. Copy assets folder recursively to dist/assets
const srcAssets = path.join(__dirname, 'assets');
const destAssets = path.join(distPath, 'assets');

function copyDirRecursive(src, dest) {
    if (!fs.existsSync(src)) return;
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyDirRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

copyDirRecursive(srcAssets, destAssets);
console.log('Build Success: All files copied to dist/ directory.');
