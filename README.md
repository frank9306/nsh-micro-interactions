# NSH Micro Interactions

[简体中文](README.zh-CN.md) · [Interactive gallery](https://frank9306.github.io/nsh-micro-interactions/)

Native Shell ports of the public Amicro micro-interactions. The interactive gallery offers English and Simplified Chinese, light and dark themes, a searchable upstream inventory, and source links for each example.

This is an independent port in progress. The gallery distinguishes working NSH previews from pending entries. A pending entry is an upstream reference. The inventory is derived from the upstream sitemap, public registry and demo catalogs, including separately listed variants.

## Run locally

Install [NSH 0.6](https://nsh.dev/), then run:

```sh
nsh check
nsh test --target web
nsh package --target web --run
```

Rebuild the files served by GitHub Pages with `python scripts/build-pages.py`. To refresh the inventory, check out Amicro at the revision in [NOTICE.txt](NOTICE.txt) and run `python scripts/catalog.py /path/to/amicro`.

## Attribution

Based on [Amicro](https://github.com/Subhan-code/Amicro--Micro-transitions-) by Syed Subhan Uddin. See [MIT license](LICENSE), [third-party notices](NOTICE.txt) and [project design](DESIGN.md).
