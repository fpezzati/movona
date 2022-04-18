import L from 'leaflet';
import 'leaflet-draw';
import m from 'mithril';

class Polylinedrawer {

  constructor(map) {
    this.map = map;
  }

  view(vnode) {
    return m('button', { onclick: ()=>{ this.drawRoute(vnode); } }, 'draw route');
  }

  drawRoute(vnode) {
    console.log("draw route clicked");
    this.polyDrawer = new L.Draw.Polyline(this.map, {});
    this.polyDrawer.enable();
  }
}
export default Polylinedrawer;
