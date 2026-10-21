# Competitor ads dashboard

Static image Facebook ads from **Canada Drives** (Ad Library, Canada, active ads sorted by impressions), grouped by marketing angle.

**Live dashboard:** https://shaynegreniersg-tech.github.io/competitor-ads/

- `index.html` – the dashboard app (filters, tags, search, sort, lightbox)
- `data.json` – ads, creatives, angles and summary stats
- `version.json` – data version; open tabs poll it about every 60 s and re-render in place when it changes
- `images/` – content-addressed JPEG thumbnails (`*_t.jpg`) and full-size versions (`*_f.jpg`)

This repo is generated. Don't edit it by hand: the build (`build.py` + `publish.sh`) overwrites it on every update.
