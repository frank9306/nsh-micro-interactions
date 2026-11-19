"""Build the reference inventory from a checkout at the pinned Amicro commit."""
import json
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import urlsplit
from xml.etree import ElementTree

PIN = "fa5f8ffbe39537a8db191806066b8773c47c82e9"
ROOT = Path(__file__).resolve().parent.parent
upstream = Path(sys.argv[1]).resolve()
head = subprocess.check_output(["git", "-C", str(upstream), "rev-parse", "HEAD"], text=True).strip()
if head != PIN:
    raise SystemExit(f"Expected Amicro {PIN}, received {head}")

entries = {}


def read(path):
    return (upstream / path).read_text(encoding="utf-8-sig")


def title(slug):
    return slug.replace("-", " ").title()


def add(key, name, family, source, preview=None, **metadata):
    row = entries.setdefault(key, {"id": key, "name": name, "family": family})
    row["name"] = name
    if source:
        row["source"] = source
    if preview:
        row["preview"] = preview
    row.update(metadata)


sitemap = ElementTree.fromstring(read("public/sitemap.xml"))
parts = {"buttons", "cards", "carousels", "loaders", "mono-charts", "dither-charts", "morphing", "ai-inputs"}
component_sources = {}
for m in re.finditer(r"'([\w-]+)':\s*\{\s*id:.*?source: 'https://github.com/[^']+/blob/main/([^']+)'", read("src/data/componentEntries.ts"), re.S):
    component_sources[m[1]] = m[2]
for loc in sitemap.findall(".//{*}loc"):
    path = urlsplit(loc.text).path.strip("/").split("/")
    if len(path) == 2 and path[0] in parts:
        family, key = path
        add(key, title(key), family, component_sources.get(key), loc.text)

registry = json.loads(read("public/r/registry.json"))
for item in registry["items"]:
    if item["type"] not in {"registry:ui", "registry:component", "registry:block"}:
        continue
    key = item["name"]
    files = [f["path"] for f in item.get("files", [])]
    source = next((file for file in files if (upstream / file).is_file() and Path(file).suffix in {".ts", ".tsx"}), None)
    if not source:
        continue
    family = entries.get(key, {}).get("family") or ("loaders" if "/loading/" in source else "primitives")
    add(key, item.get("title") or title(key), family, source)

colors = {"yellow": "#f4be53", "blue": "#789aff", "emerald": "#53dcb0", "pink": "#fa8cb9",
          "green": "#79dc93", "red": "#ff8d9f", "orange": "#ffb47d", "neutral": "#a2abc4"}
aliases = {"Github": "github", "AppleIcon": "download", "Trash2": "trash-2", "Unlock": "lock-open", "Volume2": "volume-2"}
button_file = "src/data/buttons.tsx"
for line in read(button_file).splitlines():
    m = re.search(r"id: '(\d+)', label: '([^']+)', icon1: (\w+)(?:, icon2: (\w+))?, interactionType: '([^']+)'", line)
    if not m:
        continue
    number, label, first, second, effect = m.groups()
    source = "src/components/AnimatedButton.tsx"
    icons = [aliases.get(value, re.sub(r"(?<!^)(?=[A-Z])", "-", value).lower()) for value in [first, second] if value]
    accent = re.search(r"text-(\w+)-\d+", line)
    add(f"btn-{number}", label, "buttons", source, f"https://amicro.vercel.app/buttons/btn-{number}",
        effect=effect, icons=icons, ink=colors.get(accent[1]) if accent else None)

for name, key in re.findall(r"name: '([^']+)', component: \w+, kebabName: '([^']+)'", read("src/data/loaders.ts")):
    add(key, name, "loaders", entries.get(key, {}).get("source", "src/data/loaders.ts"), f"https://amicro.vercel.app/loaders/{key}")

for file, family, route in [
    ("src/data/cssAnimationsData.ts", "animations", "animations"),
    ("src/data/textAnimations.ts", "text", "text-animations"),
    ("src/data/monoCharts.ts", "mono-charts", "mono-charts"),
    ("src/data/ditherCharts.ts", "dither-charts", "dither-charts"),
]:
    catalog = read(file)
    for m in re.finditer(r"\{\s*id:\s*['\"]([^'\"]+)['\"]\s*,\s*(?:name|label|title):\s*['\"]([^'\"]+)['\"]", catalog):
        key, name = m.groups()
        if family == "text":
            effect = re.match(r",\s*interactionType: '([^']+)'", catalog[m.end():])
            if effect:
                key = effect[1]
                add(key, name, family, entries.get(key, {}).get("source", file), f"https://amicro.vercel.app/{route}", effect=key)
        if key in entries:
            entries[key]["name"] = name
        else:
            add(key, name, family, file, f"https://amicro.vercel.app/{route}")

for folder, family, route in [
    ("cards", "cards", "cards"), ("3d", "3d", "3d"), ("morphing", "morphing", "morphing"),
    ("ai", "ai-inputs", "ai-inputs"),
]:
    for source in sorted((upstream / "src/components" / folder).glob("*.tsx")):
        slug = re.sub(r"(?<!^)(?=[A-Z])", "-", source.stem).lower()
        if slug in {"card-preview-tile", "focus-blur"}:
            continue
        existing = next((row for row in entries.values() if row.get("source") == source.relative_to(upstream).as_posix()), None)
        candidate = next((row for key, row in entries.items() if key == slug or key.replace("-", "") == slug.replace("-", "")), None)
        entry = existing or candidate
        if entry:
            entry["source"] = source.relative_to(upstream).as_posix()
            if family == "ai-inputs":
                entry["family"] = family
        else:
            add(slug, title(slug), family, source.relative_to(upstream).as_posix(), f"https://amicro.vercel.app/{route}")

for row in entries.values():
    row.setdefault("source", "src/data/componentEntries.ts")

kit = "src/components/css-animations/ui-interactions/"
for key, path in {
    "ui-context-menu": "ActionsUiKit.tsx", "ui-ab-tabs": "ActionsUiKit.tsx",
    "ui-category-select": "ControlsUiKit.tsx", "ui-date-position": "ControlsUiKit.tsx",
    "ui-light-dark-toggle": "ControlsUiKit.tsx", "ui-save-pill": "StatusPreviewTrios.tsx",
    "ui-segmented-step-bar": "NavigationTrios.tsx",
}.items():
    if key in entries:
        entries[key]["source"] = kit + path

for key in ["line", "bar", "area", "donut", "composed", "gauge-arc", "step", "funnel", "heatmap", "pyramid"]:
    identifier = "mono-rounded-" + key
    file = "src/components/mono-charts/MonoRounded" + key.title().replace("-", "") + "Chart.tsx"
    if identifier in entries and (upstream / file).is_file():
        entries[identifier]["source"] = file
for color in ["green", "blue", "purple"]:
    if "mono-activity-" + color in entries:
        entries["mono-activity-" + color]["source"] = "src/components/mono-charts/MonoActivityHeatmap.tsx"

for row in entries.values():
    if not (upstream / row["source"]).is_file():
        raise SystemExit(f"Missing component source for {row['id']}: {row['source']}")

result = sorted(entries.values(), key=lambda row: (row["family"], (int(row["id"][4:]) if row["id"].startswith("btn-") else row["name"].casefold())))
payload = json.dumps(result, ensure_ascii=False, indent=2)
(ROOT / "inventory.ts").write_text(f"// Generated by scripts/catalog.py from Amicro {PIN}.\nimport type {{ Entry }} from './model';\n\nexport const inventory: Entry[] = {payload};\n", encoding="utf-8")
print(f"{len(result)} catalog entries")
