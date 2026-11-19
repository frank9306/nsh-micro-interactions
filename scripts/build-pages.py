"""Package NSH 0.6 for the repository's GitHub Pages project site."""
import argparse
import shutil
import subprocess
import tempfile
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument("--nsh", default="nsh")
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
dest = root / "docs"
scratch = root / ".nsh"
scratch.mkdir(exist_ok=True)
subprocess.run([args.nsh, "check"], cwd=root, check=True)
with tempfile.TemporaryDirectory(prefix="pages-", dir=scratch) as temp:
    def package_entry(entry, directory):
        build = Path(temp) / directory
        subprocess.run([args.nsh, "package", "--target", "web", "--out", str(build), entry], cwd=root, check=True)
        output = next(item for item in build.iterdir() if (item / "index.html").is_file())
        for license_file in ("LICENSE", "LICENSE-LUCIDE.txt", "LICENSE-NSH.txt", "NOTICE.txt"):
            shutil.copyfile(root / license_file, output / license_file)
        return output

    package = package_entry("App.tsx", "english")
    package_entry("App.zh.tsx", "chinese").rename(package / "zh")
    (package / ".nojekyll").touch()
    if dest.exists():
        if not (dest / ".nojekyll").is_file() or not (dest / "index.html").is_file():
            raise SystemExit("Refusing to replace docs without the expected Pages build markers.")
        dest.rename(Path(temp) / "old-build")
    try:
        package.rename(dest)
    except OSError:
        previous = Path(temp) / "old-build"
        if previous.exists():
            previous.rename(dest)
        raise
