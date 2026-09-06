import urllib.request
import urllib.parse
import json

queries = {
    "Somnath": '[out:json];(node["name"~"Somnath"](20.88,70.39,20.89,70.41);way["name"~"Somnath"](20.88,70.39,20.89,70.41);relation["name"~"Somnath"](20.88,70.39,20.89,70.41););out geom;',
    "Dwarka": '[out:json];(node["name"~"Dwarkadhish"](22.23,68.96,22.24,68.97);way["name"~"Dwarkadhish"](22.23,68.96,22.24,68.97););out geom;',
}

for name, q in queries.items():
    try:
        url = "http://overpass-api.de/api/interpreter?data=" + urllib.parse.quote(q)
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            print(f"--- {name} ---")
            for element in data.get('elements', [])[:3]:
                print(element.get('type'), element.get('tags', {}).get('name'))
    except Exception as e:
        print(e)
