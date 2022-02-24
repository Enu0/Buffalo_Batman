import bottle
from tickets import get_ticket_data

@bottle.route("/")
def index():
    return bottle.static_file("index.html", root="")


@bottle.route("/map.js")
def map_js():
    return bottle.static_file("map.js", root="")


@bottle.route('/tickets')
def get_tickets():
    return get_ticket_data("https://data.buffalony.gov/resource/ux3f-ypyc.json")
    
    
bottle.run(host="0.0.0.0", port=8080)