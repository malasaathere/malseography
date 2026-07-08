# Editable Portfolio Website

This project stores editable site data in a single source-of-truth: `data.js`.

Quick edits you can make:

- Change the site logo path: edit `PORTFOLIO_DATA.assets.logo` in `data.js`.
- Change the site brand text and page title: edit `PORTFOLIO_DATA.site.brand` and `PORTFOLIO_DATA.site.title` in `data.js`.
- Update the site owner details (name, email, socials, projects, skills): edit the `PORTFOLIO_DATA.personal`, `skills`, `projects`, `timeline`, and `tools` arrays in `data.js`.

When you change these values, they are applied automatically on page load by `app.js`.

Dev workflow:

1. Serve locally (Python):
```bash
cd "./"
python3 -m http.server 8001
# then open http://localhost:8001
```

2. Or use a live-reload server (optional):
```bash
npx live-server --port=8001
```

3. Edit `data.js` and refresh the browser to see changes.

If you want, I can further centralize other strings or generate a simple admin UI to edit `data.js` through a browser interface.
