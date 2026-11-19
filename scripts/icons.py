"""Convert the selected Lucide Static 0.546.0 vectors to Canvas paths."""
import json
import math
import sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
inventory = (root / "inventory.ts").read_text(encoding="utf-8")
rows = json.loads(inventory.split("Entry[] = ", 1)[1].strip().removesuffix(";"))
nodes = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
names = {name for entry in rows for name in entry.get("icons", [])} | {"sparkles", "sun", "moon", "languages", "search", "external-link", "arrow-left", "arrow-right"}


def svg_path(kind, node):
    if kind == "path":
        return node["d"]
    if kind == "line":
        return f"M{node['x1']} {node['y1']}L{node['x2']} {node['y2']}"
    if kind in {"polyline", "polygon"}:
        return "M" + node["points"] + ("Z" if kind == "polygon" else "")
    if kind in {"circle", "ellipse"}:
        x, y = map(float, (node["cx"], node["cy"]))
        rx, ry = map(float, (node.get("rx", node.get("r")), node.get("ry", node.get("r"))))
        return f"M{x - rx} {y}a{rx} {ry} 0 1 0 {2 * rx} 0a{rx} {ry} 0 1 0 {-2 * rx} 0Z"
    if kind == "rect":
        x, y, width, height = (float(node.get(k, 0)) for k in ("x", "y", "width", "height"))
        radius = min(float(node.get("rx", 0)), width / 2, height / 2)
        if not radius:
            return f"M{x} {y}h{width}v{height}h{-width}Z"
        w, h = width - radius, height - radius
        return f"M{x + radius} {y}H{x + w}q{radius} 0 {radius} {radius}V{y + h}q0 {radius} {-radius} {radius}H{x + radius}q{-radius} 0 {-radius} {-radius}V{y + radius}q0 {-radius} {radius} {-radius}Z"
    raise ValueError(f"Unsupported Lucide shape {kind}")


paths = {name: " ".join(svg_path(kind, node) for kind, node in nodes[name]) for name in sorted(names)}
(root / "glyphs.ts").write_text("// Lucide Static 0.546.0. See LICENSE-LUCIDE.txt.\nexport const glyphs: Record<string, string> = " + json.dumps(paths, indent=2) + ";\n", encoding="utf-8")
