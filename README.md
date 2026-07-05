# AoM Retold Civ Creator - Draft

This is a static browser prototype for a future **Age of Mythology: Retold civilization creator**.

It is designed for GitHub Pages:

- no backend
- no build step
- no database
- no user accounts
- ZIP generated locally in the browser
- optional icon file stays local and is not uploaded

## How to test locally

Open `index.html` in your browser.

## How to publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload these files to the repository root:
   - `index.html`
   - `style.css`
   - `app.js`
   - `README.md`
3. Go to repository **Settings**.
4. Open **Pages**.
5. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
6. Save.
7. Open the GitHub Pages URL once GitHub finishes publishing.

## Important warning

The generated XML is intentionally a placeholder. It proves the website and ZIP export pipeline work, but it is not guaranteed to be a valid AoM Retold mod yet.

Recommended next step:

1. Create one tiny manual AoM Retold mod that the game recognizes.
2. Copy its confirmed folder paths and XML/data schema.
3. Update the generator functions in `app.js`:
   - `makeCivXml`
   - `makeTechTreeXml`
   - `makeStringModsXml`
   - `generateZip`

## Why there is no JSZip dependency

This draft includes a tiny no-compression ZIP writer directly in `app.js`. That keeps the project dependency-free and easy to host on GitHub Pages.

Later, you may replace it with JSZip if you want compression and more ZIP features.
