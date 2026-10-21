# Competitor ads dashboard

Facebook ads from **Canada Drives** (Ad Library, Canada, active ads sorted by impressions), grouped by marketing angle: static image ads and video ads, with an Images | Videos | All switch.

**Live dashboard:** https://shaynegreniersg-tech.github.io/competitor-ads/ (videos: `#videos`, combined: `#all`)

- `index.html`: the dashboard app (filters, tags, search incl. video transcripts, sort, lightbox and video player)
- `data.json`: ads, creatives, angles and summary stats (`videos` holds the video half)
- `version.json`: data version. Open tabs poll it about every 60 s and re-render in place when it changes.
- `images/`: content-addressed JPEG thumbnails (`*_t.jpg`) and full-size versions (`*_f.jpg`)
- `videos/`: one MP4 per unique video (H.264/AAC, faststart) plus a compressed poster (`*_p.jpg`)

This repo is generated. Don't edit it by hand: the build (`build.py` + `publish.sh`) overwrites it on every update.
