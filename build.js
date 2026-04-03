const fs = require('fs');
const path = require('path');

const htmlPath = 'index.html';
const cssPath = 'styles.css';
const jsPath = 'script.js';

let html = fs.readFileSync(htmlPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');
let js = fs.readFileSync(jsPath, 'utf8');

// Strip out media query wrappers completely to enforce the exact PC replica layout globally.
// This requires replacing the starting line and ending brace.
css = css.replace(/@media \(min-width: 768px\) \{([\s\S]*?)\}/g, '$1');
css = css.replace(/@media \(min-width: 1024px\) \{([\s\S]*?)\}/g, '$1');
css = css.replace(/\/\* We keep the marquee animation on desktop as requested for premium feel \*\//g, '');

// Restore full 1200px viewport with unconstrained scaling so Android shrinks it cleanly instead of crunching the text
html = html.replace('<meta name="viewport" content="width=1200">', '<meta name="viewport" content="width=1200, initial-scale=0.25">');

// Embed CSS & JS
html = html.replace('<link rel="stylesheet" href="styles.css">', `<style>\n${css}\n</style>`);
html = html.replace('<script src="script.js"></script>', `<script>\n${js}\n</script>`);

// Base64 encode images in HTML/CSS/JS exactly
function base64Encode(file) {
    if (fs.existsSync(file)) {
        return fs.readFileSync(file, {encoding: 'base64'});
    }
    return '';
}

html = html.replace(/url\('([^']+)'\)/g, (match, p1) => {
    let b64 = base64Encode(p1);
    if (b64) return `url('data:image/png;base64,${b64}')`;
    return match;
});

html = html.replace(/imageSrc:\s*"([^"]+)"/g, (match, p1) => {
    let b64 = base64Encode(p1);
    if (b64) return `imageSrc: "data:image/png;base64,${b64}"`;
    return match;
});

fs.writeFileSync('index_single_file.html', html, 'utf8');
console.log('Successfully packed everything into index_single_file.html');
