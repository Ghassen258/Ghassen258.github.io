# Ghassen Ben Jaber · Software Engineering Portfolio

A responsive, recruiter-oriented portfolio showcasing software projects, technical stacks, architectural decisions, demos and engineering tradeoffs.

## What is included

- Six documented project case studies: EchoVault, Linkfall, Forked Futures, Diff Detective, MiniDB and AlgoHunter, including five live browser demos.
- Filters by project domain (**Web & Interactive**, **Games & Storytelling**, **Console & CLI**, **Systems & Tooling**) and actual project technology.
- Full-text project search; a modal for architecture, challenges, key features, contributions, and limitations.
- About, engineering background, technical stack and recruiter contact section.
- Keyboard support, reduced-motion styles, responsive layout, semantic HTML and no analytics or tracking.
- No runtime dependencies, no bundler, no external UI framework. Fonts use Google Fonts with system fallbacks.

## Local preview

From the repository root, start a local static server (ES modules require HTTP):

```sh
python -m http.server 8000
```

Open http://localhost:8000 in your browser.

## Tests

```sh
npm test
npm run check
```

Node.js is only needed for tests; the site itself is static.

## Deploying to GitHub Pages

1. Create a **public** repository named exactly `Ghassen258.github.io`, without initializing it with a README or license. GitHub does not let the connected uploader create repositories itself.
2. Upload or push the contents of this directory to the repository's `main` branch.
3. Open **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions** (not "Deploy from a branch").
4. Open **Actions → Publish portfolio to GitHub Pages → Run workflow**, choose `main`, and start the run. GitHub may also start a run automatically on push.
5. After a successful build and deployment, visit **https://ghassen258.github.io/**.

The Pages workflow runs the automated tests, validates the JavaScript, and publishes only the website assets (`index.html`, `styles.css`, `app.js`, `data.js`, `assets/`). Source and tests stay in the repository but are not deployed. Future changes to the site automatically trigger a new deployment.

## Adding future projects

The collection deliberately includes only the six projects built for this portfolio so far. New verified projects can be appended to the `projects` array in `data.js`, along with their technical details, demo URL and illustration in `app.js`. Category counts and technology options update automatically.

## Editing the portfolio

- **`data.js`** is the source of truth for projects: change descriptions, tags, links, statuses, categories, and detailed case-study content here.
- **`app.js`** handles filtering, search, case-study dialogs and self-contained SVG project artwork.
- **`styles.css`** contains typography, colors, layout and responsive design.
- **`index.html`** contains the hero, experience, skills and contact sections.
- **`assets/mark.svg`** is the site favicon.

Only publish verified and shareable work. Projects without a public demo or source should explicitly identify that limitation.

## Privacy

The website does not load any third-party analytics or collect contact forms. Email links open the visitor's email client. Fonts are fetched from Google Fonts; replace these with system fonts if you prefer no third-party font requests.
