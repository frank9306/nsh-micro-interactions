"""Extract keyframes and durations for Amicro's twelve public shape morphs."""
from ast import literal_eval
import json
from pathlib import Path
import re
import subprocess
import sys

upstream = Path(sys.argv[1]).resolve()
pin = subprocess.check_output(["git", "-C", str(upstream), "rev-parse", "HEAD"], text=True).strip()
if pin != "fa5f8ffbe39537a8db191806066b8773c47c82e9":
    raise SystemExit("Unexpected upstream revision")
source = (upstream / "src/components/morphing/keyframeMorphs.tsx").read_text(encoding="utf-8")
found = {}
for entry in re.finditer(r"id: '([\w-]+)',.*?component: (\w+),", source, re.S):
    slug, name = entry.groups()
    function = re.search(rf"export function {name}\(\{{(.*?)\n\}}: KeyframeMorphProps\) \{{(.*?)\n\}}", source, re.S)
    if not function:
        raise SystemExit("Missing declaration for " + name)
    duration = float(re.search(r"duration = ([\d.]+)", function[1])[1])
    raw = re.search(r"animate=\{\{(.*?)\}\}", function[2], re.S)[1]
    channels = {key: literal_eval(array) for key, array in re.findall(r"(\w+):\s*(\[[^\]]*\])", raw)}
    if not channels or set(channels) - {"borderRadius", "rotate", "scale", "scaleX", "scaleY", "skewX", "skewY"}:
        raise SystemExit("Unknown channel for " + name)
    found[slug] = dict(duration=duration, **channels)
if len(found) != 12:
    raise SystemExit(f"Expected twelve upstream morphs, found {len(found)}")
root = Path(__file__).resolve().parent.parent
(root / "morphRecipes.ts").write_text(
    "// Generated from Amicro keyframeMorphs.tsx. See LICENSE.\n"
    "import type { ShapeRecipe } from './ports/ShapeMotion';\n"
    "export const shapes: Record<string, ShapeRecipe> = "
    + json.dumps(found, indent=2) + ";\n",
    encoding="utf-8",
)
