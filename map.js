/*eslint-disable no-undef */

function loadMap(){
    Plotly.setPlotConfig({
        mapboxAccessToken: 'pk.eyJ1IjoiMTUxOTk5MzYwMyIsImEiOiJjam5yd3IxZDgwY3pjM2twa2F0bG1jbXIxIn0.2I79-VSGNNIHZEcMJzsSAg'
    });

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var mapParams = getMapParams(this.response);
            Plotly.plot('map', mapParams.data, mapParams.layout);
        }
    };
    xhttp.open("GET", "/tickets");
    xhttp.send();
}

function setupMapData(array){
    var lati = [];
    var long = [];
    var texti = [];
    
    for(var i of array){
        lati.push(i[0]);
        long.push(i[1]);
        texti.push(i[2])
}
        
        var data = [{
            type: 'scattermapbox',
            mode: 'markers',
            marker: {
            size : 5,
              color : "rgb(255,0,0)"
              },
            lon: long,
            lat: lati,
            text : texti
        }]
        
return data;
}

function findCenter(array){
    var long = [];
    var lati = [];

    for(var i of array){
        long.push(i[1]);
        lati.push(i[0]);
    }

    var cLat = (Math.max.apply(Math,lati) + Math.min.apply(Math,lati))/2;
    var cLon = (Math.max.apply(Math,long) + Math.min.apply(Math,long))/2;
    center = [cLat,cLon];
    return center;
}

function setupMapLayout(arr){
    var lati= findCenter(arr)[0];
    var long= findCenter(arr)[1];
    var layout = {
    
        mapbox: {
            
            style:"satellite-streets",
            center: {
                lat:lati,
                lon:long
            },
            
            zoom:11
  }
}
return layout;
}

function getMapParams(jString){
    arr = JSON.parse(jString);
    var dat = setupMapData(arr);
    var lay = setupMapLayout(arr);
    
    var result = {
        data : dat,
        layout : lay
    }
    return result;
}



var lis = [[35.6763257, 139.6993177, "Meiji Shrine"],[35.7101456, 139.8105814, "Skytree"],[35.6950532, 139.7017945, "Godzilla Head"]]
console.log(findCenter(lis));