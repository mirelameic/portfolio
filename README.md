# Portfolio

**Live at [mirelameic.com](https://mirelameic.com)**

A personal portfolio site with an editorial, blueprint-diagram aesthetic — built with plain HTML, CSS, and JavaScript (no framework, no build step, no dependencies).

Sections: intro, about, experience (interactive timeline), and contact. Includes light/dark themes, animated SVG diagrams, and a bit of grain texture for a more physical feel.

## Running it locally

Any static file server works. From this folder:

```bash
python3 -m http.server 8420
```

Then open `http://localhost:8420/` in a browser.

## Structure

```
index.html        all page markup
css/style.css     all styles (theming, layout, animations)
js/main.js        theme toggle, scroll reveals, interactive diagrams
assets/           favicon and background texture (SVG)
```

No build tools, no package manager — edit the files directly and refresh.
