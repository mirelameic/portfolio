# Portfolio

**Live at [mirelameic.com](https://mirelameic.com)**

A personal portfolio site with an editorial, blueprint-diagram aesthetic — built with plain HTML, CSS, and JavaScript (no framework, no build step, no dependencies).

Sections: intro, about, projects and experience (interactive timelines), and contact, with a side dot-nav that tracks scroll position. Includes light/dark themes, animated SVG diagrams, and a bit of grain texture for a more physical feel.

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
js/main.js        theme toggle, scroll reveals, side nav, interactive diagrams
assets/           favicon, background texture (SVG), and the social preview image
```

No build tools, no package manager — edit the files directly and refresh.
