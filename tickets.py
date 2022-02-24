import urllib.request
import json


def get_ticket_data(JSONdata):
    comp = []
    response = urllib.request.urlopen(JSONdata)
    jdata = response.read()
    rawdata = json.loads(jdata)
    for item in rawdata:
        if "latitude" in item and "longitude" in item:
            current=[]
            current.append(float(item["latitude"]))
            current.append(float(item["longitude"]))
            current.append(item["viodesc"])
            comp.append(current)
    return json.dumps(comp)