import base64
import os
import re

html_path = 'index.html'
css_path = 'styles.css'
js_path = 'script.js'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

with open(js_path, 'r', encoding='utf-8') as f:
    js = f.read()

# Force PC replica by removing the media wrappers so the layout rules apply universally
css = css.replace('@media (min-width: 768px) {', '/* @media 768px removed for PC replica */')
css = css.replace('@media (min-width: 1024px) {', '/* @media 1024px removed for PC replica */')
css = css.replace('}\n\n/* We keep the marquee animation on desktop as requested for premium feel */', '/* } removed */')
# We need to drop the closing block brackets for the media queries. A simple hack is to just strip them since we know where they are.
# Actually, instead of removing the brackets blindly, let me just replace the entire block of queries using regex or explicit replace.

css = re.sub(r'@media \(min-width: 768px\) \{([^}]+)\}', r'\1', css, flags=re.DOTALL)
css = re.sub(r'@media \(min-width: 1024px\) \{([^}]+)\}', r'\1', css, flags=re.DOTALL)


# Restore proper viewport scaling so the PC replica zooms out beautifully instead of cropping unreadably
html = html.replace('<meta name="viewport" content="width=1200">', '<meta name="viewport" content="width=1200, initial-scale=0.25, maximum-scale=2.0">')

# Embed CSS
html = html.replace('<link rel="stylesheet" href="styles.css">', f'<style>\n{css}\n</style>')

# Embed JS
html = html.replace('<script src="script.js"></script>', f'<script>\n{js}\n</script>')

# Base64 encode images in CSS
def replace_img_css(match):
    img_path = match.group(1)
    if os.path.exists(img_path):
        with open(img_path, 'rb') as img_f:
            b64 = base64.b64encode(img_f.read()).decode('utf-8')
        return f"url('data:image/png;base64,{b64}')"
    return match.group(0)

html = re.sub(r"url\('([^']+)'\)", replace_img_css, html)

# Base64 encode imageSrc in JS
def replace_img_js(match):
    img_path = match.group(1)
    if os.path.exists(img_path):
        with open(img_path, 'rb') as img_f:
            b64 = base64.b64encode(img_f.read()).decode('utf-8')
        return f'imageSrc: "data:image/png;base64,{b64}"'
    return match.group(0)

html = re.sub(r'imageSrc:\s*"([^"]+)"', replace_img_js, html)

# Output as a single portable file
with open('index_single_file.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Created index_single_file.html successfully")
