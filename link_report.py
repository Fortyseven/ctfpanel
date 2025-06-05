import json
import requests
from urllib.parse import urlparse

def find_urls(obj, path=""):
    """Recursively find all URLs in the JSON structure."""
    urls = []
    if isinstance(obj, dict):
        for k, v in obj.items():
            new_path = f"{path}/{k}" if path else k
            if k == "url" and isinstance(v, str) and urlparse(v).scheme in ("http", "https"):
                urls.append((new_path, v))
            else:
                urls.extend(find_urls(v, new_path))
    elif isinstance(obj, list):
        for idx, item in enumerate(obj):
            urls.extend(find_urls(item, f"{path}[{idx}]"))
    return urls

def check_url(url):
    try:
        resp = requests.head(url, allow_redirects=True, timeout=8)
        if resp.status_code == 405:  # Method Not Allowed, try GET
            resp = requests.get(url, allow_redirects=True, timeout=8)
        return resp.status_code == 200
    except Exception:
        return False

def main():
    with open("src/views/data.json") as f:
        data = json.load(f)
    urls = find_urls(data)
    dead_links = []
    print(f"Checking {len(urls)} URLs...")
    for path, url in urls:
        print(f"Checking: {url}")
        if not check_url(url):
            dead_links.append((path, url))
    with open("dead_links_report.txt", "w") as report:
        if dead_links:
            report.write("Dead links found:\n")
            for path, url in dead_links:
                report.write(f"{path}: {url}\n")
            print(f"Dead links written to dead_links_report.txt")
        else:
            report.write("No dead links found.\n")
            print("No dead links found.")

if __name__ == "__main__":
    main()