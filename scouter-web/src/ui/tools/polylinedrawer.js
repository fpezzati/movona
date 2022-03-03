import L from 'leaflet';
import m from 'mithril';

class Polylinedrawer {

  constructor(map) {
    this.map = map;
    this.polyDrawer = {};
  }

  oninit(vnode) {
  //    this.polyDrawer = new L.Draw.Polyline(this.map, {});
  //    this.polyDrawer.enable();
  }

  view(vnode) {
    return m('button', { onclick: this.drawRoute(vnode) }, 'draw route');
  }

  drawRoute(vnode) {
    console.log('drawRoute');
  }
}
export default Polylinedrawer;
