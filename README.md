# VAWnet — static HTML/CSS mockup

Standard HTML + CSS, no build step. Open `index.html` in a browser.

## Files

    index.html        Homepage (hero search, collections, audience, events, news, poster)
    library.html      Search results with faceted filtering
    material.html     Material / Special Collection detail
    news.html         News index
    article.html      News article
    about.html        About + contact
    assets/css/styles.css   All tokens and component classes
    assets/js/site.js       Menus, tabs, facets, chips, save toggles, quick exit

## Styling

Every colour, font, size, space, radius and shadow is a CSS custom property
defined once in `:root` at the top of `styles.css` (section 1). Nothing else
in the stylesheet hard-codes a hex or a font name — restyling the site means
editing those variables.

Key variables:

    --color-brand-500   #bf78b8   primary brand colour (ramp 100–900 available)
    --color-ink         #050505   text
    --color-link        brand-500
    --color-bg / --color-surface  page and panel grounds
    --color-line / --color-line-strong  the two rule weights
    --font-heading / --font-body  Archivo
    --text-2xs … --text-6xl       type scale
    --space-1 … --space-20        spacing scale
    --radius-sm/md/lg             6 / 8 / 12px
    --container, --page-min-width layout

Class naming is BEM-lite: `.block`, `.block__element`, `.block--modifier`,
plus state classes `.is-active` / `.is-open` / `.is-saved` that the JS toggles.
There are no inline styles anywhere in the markup — one-off spacing and measure
adjustments use the small utility set at the end of the stylesheet
(`.stack-*`, `.gap-below-*`, `.measure-*`, `.flush-top`).

## WordPress mapping

    index.html     front-page.php
    library.html   search.php / archive-material.php (facets = taxonomy queries)
    material.html  single-material.php
    news.html      archive-post.php (or archive-news.php)
    article.html   single.php
    about.html     page.php

Images currently point at vawnet.org; re-upload them to the media library
during migration.
