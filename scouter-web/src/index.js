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

class ScouterWeb extends HTMLElement {
  constructor() {
    super();
    console.log("this is scouter-web's constructor: " + Scouter);
    console.log(JSON.stringify(Scouter));
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(tmplt.content.cloneNode(true));
    this.scouter = new Scouter;
    this.state = {};
    this.main = {};
  }

  configureUI(map) {
    var polylineDrawer = new Polylinedrawer(map);
    var uploadGeoJsonMap = new UploadGeoJsonMap;
    var tools = new Tools([polylineDrawer, uploadGeoJsonMap]);
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

    this.map.on('draw:created', (geometry)=>{
      console.log(JSON.stringify(geometry));
    });
    this.configureUI(this.map);

    console.log("scouter-web's connected callback: " + Scouter);
    this.main.scouter = this.scouter;
    this.main.send = this.send.bind(this);
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
    this.geojsonLayer = L.geoJSON(state.support_map).addTo(this.map);
  }
}
window.customElements.define('scouter-web', ScouterWeb);
