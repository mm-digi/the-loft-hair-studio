/**
 * Builds The Loft static site from WordPress Custom HTML exports.
 * - Replaces remote image URLs with /images/*
 * - Injects shared header + footer partials
 * - Normalises multi-page navigation
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const WP = path.join(ROOT, "Wordpress Pages");
const OUT = __dirname;

const BOOK =
  "https://www.fresha.com/a/gareth-at-the-loft-hair-studio-bristol-merton-road-s43w0y8a";

const pages = [
  {
    file: "Homepage.txt",
    out: "index.html",
    rootId: "loft-home",
    headerId: "loftHeader",
    title: "The Loft Hair Studio | Independent Hair Studio Bristol",
    active: "home",
  },
  {
    file: "About.txt",
    out: path.join("about", "index.html"),
    rootId: "loft-about",
    headerId: "loftAboutHeader",
    title: "About | The Loft Hair Studio Bristol",
    active: "about",
  },
  {
    file: "Services.txt",
    out: path.join("services", "index.html"),
    rootId: "loft-services-page",
    headerId: "loftServicesHeader",
    title: "Services | The Loft Hair Studio Bristol",
    active: "services",
  },
  {
    file: "Portfolio.txt",
    out: path.join("portfolio", "index.html"),
    rootId: "loft-portfolio",
    headerId: "loftPortfolioHeader",
    title: "Portfolio | The Loft Hair Studio Bristol",
    active: "portfolio",
  },
  {
    file: "Contact.txt",
    out: path.join("contact", "index.html"),
    rootId: "loft-contact",
    headerId: "loftContactHeader",
    title: "Contact | The Loft Hair Studio Bristol",
    active: "contact",
  },
];

function navLink(href, label, activeKey, current) {
  const isActive = activeKey === current ? ' class="is-active"' : "";
  return `<a${isActive} href="${href}">${label}</a>`;
}

function buildHeader(active, headerId) {
  return `  <header class="loft-header" id="${headerId}">
    <a class="loft-brand" href="/" aria-label="The Loft Hair Studio home">
      <span class="loft-brand__small">THE</span>
      <span class="loft-brand__main">LOFT</span>
      <span class="loft-brand__sub">HAIR STUDIO · BRISTOL</span>
    </a>

    <nav class="loft-nav" aria-label="Main navigation">
      ${navLink("/about/", "ABOUT", "about", active)}
      ${navLink("/services/", "SERVICES", "services", active)}
      ${navLink("/portfolio/", "PORTFOLIO", "portfolio", active)}
      ${navLink("/contact/", "CONTACT", "contact", active)}
    </nav>

    <a class="loft-header-book loft-magnetic" href="${BOOK}" target="_blank" rel="noopener">
      <span>BOOK NOW</span>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
    </a>

    <button class="loft-menu-toggle" type="button" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span>
    </button>
  </header>

  <div class="loft-mobile-menu" aria-hidden="true">
    <nav>
      <a href="/">Home</a>
      <a href="/about/">About</a>
      <a href="/services/">Services</a>
      <a href="/portfolio/">Portfolio</a>
      <a href="/contact/">Contact</a>
      <a class="loft-mobile-book" href="${BOOK}" target="_blank" rel="noopener">Book an appointment</a>
    </nav>
  </div>`;
}

function buildFooter() {
  return `  <footer class="loft-footer">
    <div class="loft-footer__top">
      <div class="loft-footer__brand">
        <span>THE</span>
        <strong>LOFT</strong>
        <small>HAIR STUDIO · BRISTOL</small>
      </div>
      <div class="loft-footer__statement">
        <p>Modern hair.<br><em>Thoughtfully made.</em></p>
      </div>
    </div>

    <div class="loft-footer__middle">
      <nav>
        <span>EXPLORE</span>
        <a href="/">Home</a>
        <a href="/about/">About</a>
        <a href="/services/">Services</a>
        <a href="/portfolio/">Portfolio</a>
        <a href="/contact/">Contact</a>
      </nav>
      <nav>
        <span>BOOK</span>
        <a href="${BOOK}" target="_blank" rel="noopener">Fresha ↗</a>
        <a href="https://www.treatwell.co.uk/place/gareth-the-loft-hair-studio/" target="_blank" rel="noopener">Treatwell ↗</a>
      </nav>
      <nav class="loft-footer__social">
        <span>FOLLOW</span>
        <div class="loft-social-icons">
          <a href="https://www.instagram.com/thelofthairstudiobristol/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Follow The Loft Hair Studio on Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5"></rect>
              <circle cx="12" cy="12" r="4"></circle>
              <circle cx="17.5" cy="6.5" r="1"></circle>
            </svg>
          </a>
          <a href="https://www.facebook.com/thelofthairstudiobristol" target="_blank" rel="noopener noreferrer" aria-label="Follow The Loft Hair Studio on Facebook">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14 8h3V4.5c-.8-.1-1.8-.2-3-.2-3 0-5 1.8-5 5.2V12H6v4h3v8h4v-8h3.3l.7-4H13V9.8c0-1.2.4-1.8 1-1.8Z"></path>
            </svg>
          </a>
          <a href="https://www.tiktok.com/@thelofthairstudiobristol" target="_blank" rel="noopener noreferrer" aria-label="Follow The Loft Hair Studio on TikTok">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14.5 4c.7 2 2 3.2 4 3.7v3.4c-1.5-.1-2.8-.5-4-1.2v6.2c0 4-3.2 7-7.1 6.3A6.3 6.3 0 0 1 8 10v3.5a2.8 2.8 0 1 0 2.8 2.8V4h3.7Z"></path>
            </svg>
          </a>
        </div>
      </nav>
      <div class="loft-footer__newsletter">
        <span>GOOD HAIR IN YOUR INBOX</span>
        <p>Studio news, hair inspiration and appointment updates.</p>
        <form onsubmit="event.preventDefault();">
          <label class="screen-reader-text" for="loftEmail">Email address</label>
          <input id="loftEmail" type="email" placeholder="Your email address">
          <button type="submit" aria-label="Subscribe">→</button>
        </form>
      </div>
    </div>

    <div class="loft-footer__bottom">
      <p>© ${new Date().getFullYear()} THE LOFT HAIR STUDIO</p>
      <div>
        <a href="/privacy-policy/">PRIVACY</a>
        <a href="/cookie-policy/">COOKIES</a>
      </div>
      <p>DESIGNED BY <a href="https://mm-digi.co.uk/" target="_blank" rel="noopener">MM DIGITAL</a></p>
    </div>
  </footer>`;
}

function rewriteImages(html) {
  return html.replace(
    /https:\/\/mm-digi\.co\.uk\/wp-content\/uploads\/2026\/07\/([^"'\s]+)/g,
    (_, file) => `/images/${file.replace(/-scaled(?=\.)/, "")}`
  );
}

function rewriteLinks(html) {
  return html
    .replace(/href="#loft-story"/g, 'href="/about/"')
    .replace(/href="#loft-services"/g, 'href="/services/"')
    .replace(/href="#loft-work"/g, 'href="/portfolio/"')
    .replace(/href="#loft-visit"/g, 'href="/contact/"')
    .replace(/href="#loft-home"/g, 'href="/"')
    .replace(/href="\/about\/"/g, 'href="/about/"')
    .replace(/href="\/services\/"/g, 'href="/services/"')
    .replace(/href="\/portfolio\/"/g, 'href="/portfolio/"')
    .replace(/href="\/contact\/"/g, 'href="/contact/"');
}

function stripOuterComments(html) {
  return html.replace(/^<!--[\s\S]*?-->\s*/m, "").trim();
}

function replaceHeader(html, active, headerId) {
  // Match from first <header class="loft-header"... through mobile menu closing div
  return html.replace(
    /<header class="loft-header"[\s\S]*?<\/header>\s*<div class="loft-mobile-menu"[\s\S]*?<\/div>/,
    buildHeader(active, headerId)
  );
}

function replaceFooter(html) {
  return html.replace(/<footer class="loft-footer"[\s\S]*?<\/footer>/, buildFooter());
}

function extractStyleAndScript(html) {
  const styleMatch = html.match(/<style>[\s\S]*?<\/style>/);
  const scriptMatch = html.match(/<script>[\s\S]*?<\/script>\s*$/);
  const style = styleMatch ? styleMatch[0] : "";
  const script = scriptMatch ? scriptMatch[0] : "";
  let body = html;
  if (styleMatch) body = body.replace(styleMatch[0], "");
  if (scriptMatch) body = body.replace(scriptMatch[0], "");
  return { body: body.trim(), style, script };
}

function wrapPage({ title, body, style, script }) {
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="The Loft Hair Studio, Bristol. Thoughtful cuts, dimensional colour and beautifully wearable hair.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Italiana&display=swap" rel="stylesheet">
  <style>
    html, body { margin: 0; padding: 0; }
    img { max-width: 100%; height: auto; }
  </style>
  ${style}
</head>
<body>
${body}
${script}
</body>
</html>
`;
}

// Write partials for maintenance
fs.writeFileSync(
  path.join(OUT, "partials", "header.html"),
  buildHeader("home", "loftHeader"),
  "utf8"
);
fs.writeFileSync(path.join(OUT, "partials", "footer.html"), buildFooter(), "utf8");

for (const page of pages) {
  const raw = fs.readFileSync(path.join(WP, page.file), "utf8");
  let html = stripOuterComments(raw);
  html = rewriteImages(html);
  html = rewriteLinks(html);
  html = replaceHeader(html, page.active, page.headerId);
  html = replaceFooter(html);

  const { body, style, script } = extractStyleAndScript(html);
  const full = wrapPage({
    title: page.title,
    body,
    style,
    script,
  });

  const outPath = path.join(OUT, page.out);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, full, "utf8");
  console.log("Built", page.out);
}

// vercel config
fs.writeFileSync(
  path.join(OUT, "vercel.json"),
  JSON.stringify(
    {
      cleanUrls: true,
      trailingSlash: true,
    },
    null,
    2
  ),
  "utf8"
);

fs.writeFileSync(
  path.join(OUT, "package.json"),
  JSON.stringify(
    {
      name: "the-loft-hair-studio",
      private: true,
      scripts: {
        build: "node build.mjs",
      },
    },
    null,
    2
  ),
  "utf8"
);

fs.writeFileSync(
  path.join(OUT, "README.md"),
  `# The Loft Hair Studio

Static multi-page site rebuilt from the WordPress Custom HTML exports.

## Pages

- \`/\` Homepage
- \`/about/\`
- \`/services/\`
- \`/portfolio/\`
- \`/contact/\`

## Rebuild from WordPress sources

\`\`\`bash
node build.mjs
\`\`\`

Shared chrome lives in \`partials/header.html\` and \`partials/footer.html\` (generated by the build).
Images are local under \`/images/\`.
`,
  "utf8"
);

console.log("Done.");
