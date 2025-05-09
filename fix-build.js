// fix-build.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set paths
const distDir = path.join(__dirname, 'dist');
const indexPath = path.join(distDir, 'index.html');
const assetsDir = path.join(distDir, 'assets');

console.log('Starting post-build processing for GitHub Pages...');

// Find the generated HTML file in assets directory
try {
  const files = fs.readdirSync(assetsDir);
  const htmlFile = files.find(file => file.startsWith('index-') && file.endsWith('.html'));
  
  if (htmlFile) {
    const assetIndexPath = path.join(assetsDir, htmlFile);
    const contents = fs.readFileSync(assetIndexPath, 'utf8');
    
    console.log(`Found generated HTML: ${htmlFile}`);
    
    // Create a proper index.html that directly includes the generated content
    const indexContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code: Color</title>
  <script type="module">
    // Include your main Svelte mounting script directly
    import { mount } from "/Code-Color/assets/index.js";
    import App from "/Code-Color/assets/App.js";
    mount(App, { target: document.getElementById('app') });
  </script>
</head>
<body>
  <div id="app"></div>
</body>
</html>`;
    
    console.log('Writing new index.html...');
    fs.writeFileSync(indexPath, indexContent);
    console.log('Post-build processing complete!');
  } else {
    console.error('No HTML file found in assets directory');
  }
} catch (error) {
  console.error('Error during post-build processing:', error);
}
