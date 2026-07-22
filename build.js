const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (supabaseUrl && supabaseKey) {
    // Replace all occurrences of the placeholders
    appJs = appJs.replace(/SUPABASE_URL_PLACEHOLDER/g, supabaseUrl);
    appJs = appJs.replace(/SUPABASE_KEY_PLACEHOLDER/g, supabaseKey);
    
    fs.writeFileSync(appJsPath, appJs);
    console.log('Build Success: Supabase environment variables injected.');
} else {
    console.log('Build Info: No Supabase environment variables found on Vercel. Using local defaults.');
}
