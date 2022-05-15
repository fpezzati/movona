const tmplt = document.createElement('template');
tmplt.innerHTML = `
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
   integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
   crossorigin=""/>
<link rel="stylesheet" href="./scouter.css" />
<div class="scouter-bound">
  <div id="map"></div>
  <div id="scouter"></div>
</div>
`;

import m from 'mithril';
import L from 'leaflet';
import Polylinedrawer from './ui/tools/polylinedrawer';
import UploadGeoJsonMap from './ui/tools/uploadgeojsonmap';
import Tools from './ui/tools/tools';
import Main from './ui/main.js';
import Scouter from 'scouter/dist/scouter';
import {v4 as uuid4} from 'uuid';

class ScouterWeb extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(tmplt.content.cloneNode(true));
    this.scouter = new Scouter;
    this.state = { document_map: { features: [] } };
    this.main = {};
    var drawPolylineHandler = {
      command: 'draw_polyline',
      behave: function(msg, state) {
        state.draw = msg.payload.value;
        return state;
      }
    };
    this.scouter.eventshandler.eventbus.handlers.set(drawPolylineHandler.command, drawPolylineHandler);
    JSON.stringify(this.scouter.eventshandler.handlers);
  }

  configureUI(map) {
    this.polylineDrawer = new L.Draw.Polyline(map, {});
    var tools = new Tools([
      new Polylinedrawer(this.send.bind(this)),
      new UploadGeoJsonMap(this.send.bind(this))
    ]);
    this.main = new Main(tools);
  }

  connectedCallback() {
    let mapElement = this._shadowRoot.getElementById('map');
    this.map = L.map(mapElement);
    this.map.setView([43.75125720420175, 11.2445068359375], 9);
    this.geojsonLayer = L.geoJSON().addTo(this.map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.on(L.Draw.Event.CREATED, (evt)=>{
      var featureGroup = L.featureGroup();
      featureGroup.addLayer(evt.layer);
      var feature = featureGroup.toGeoJSON();
      feature.features[0].properties.id = uuid4();
      this.send({ command: 'addplace', payload: feature });
    });
    this.configureUI(this.map);

    this.main.send = this.send.bind(this);
    this.main.scouter = this.scouter;
    this.main.state = this.state;
    m.mount(this._shadowRoot.getElementById('scouter'), this.main);
    console.log('leaflet connected and ready!');
  }

  send(event) {
    this.state = this.scouter.accept(event, this.state);
    this.refresh(this.state);
  }

  refresh(state) {
    console.log("refreshing");
    this.geojsonLayer.remove();
    L.geoJSON(state.support_map).addTo(this.map);
    L.geoJSON(state.document_map, {
      onEachFeature: function(feature, layer) {
        layer.on('click', (e) => {
          e.target.editing.enable();
        });
      }
    }).addTo(this.map);
    if(state.draw === 'polyline') {
      this.polylineDrawer.enable();
    } else {
      this.polylineDrawer.disable();
    }
  }
}
window.customElements.define('scouter-web', ScouterWeb);
