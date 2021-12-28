import json
import jsbeautifier


def pp_json(obj: dict) -> str:
    opts = jsbeautifier.default_options()
    opts.indent_size = 2
    return jsbeautifier.beautify(json.dumps(obj), opts)


source = """[{"id": "612d57d05a0c402eb806fe20","roadPosition": {"regionId": 133,"roadId": 2520,"position": 1730,"roadSide": 2,"offset": 8},"lat": -37.841256,"lon": 175.348367,"address": "Airport Rd","postedSpeedLimit": 50,"stationTypes": [1],"hasSampleImages": false},{"id": "612d57d05a0c402eb806fe70","roadPosition": {"regionId": 193,"roadId": 422,"position": 292,"roadSide": 2,"offset": 6},"lat": -35.678686,"lon": 174.326005,"address": "Vinegar Hill Rd Ctrl","postedSpeedLimit": 50,"stationTypes": [1],"hasSampleImages": true},{"id": "612d57d05a0c402eb806fe99","roadPosition": {"regionId": 193,"roadId": 422,"position": 292,"roadSide": 2},"lat": -35.678677,"lon": 174.325932,"address": "Vinegar Hill Rd Ctrl","postedSpeedLimit": 50,"stationTypes": [1],"hasSampleImages": true},{"id": "612d57d05a0c402eb806fee3","roadPosition": {"regionId": 193,"roadId": 422,"position": 332},"lat": -35.678308,"lon": 174.326252,"address": "Vinegar Hill Road","postedSpeedLimit": null,"stationTypes": [1],"hasSampleImages": false}]"""

source_json = json.loads(source)
output = [{
    "type": "Feature",
    "properties": {
        "roadPosition": entrie["roadPosition"],
        "address": entrie["address"],
        "postedSpeedLimit": entrie["postedSpeedLimit"],
        "stationTypes": entrie["stationTypes"],
        "hasSmapleImages": entrie["hasSampleImages"]
    },
    "geometry": {
        "type": "Point",
        "coordinates": [
            entrie["lon"],
            entrie["lat"]
        ]
    }
} for entrie in source_json]

print(pp_json(output))

with open("output.geojson", "w+") as file:
    file.write(pp_json(output))
