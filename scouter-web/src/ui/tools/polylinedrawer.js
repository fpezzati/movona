import L from 'leaflet';
import 'leaflet-draw';
import m from 'mithril';

class Polylinedrawer {

  constructor(send) {
    this.polylineDrawEnabled = false;
    this.send = send;
  }

  view(vnode) {
    return m('button', { onclick: ()=>{ this.drawRoute(vnode); } }, 'draw route');
  }

  drawRoute(vnode) {
    if(!this.polylineDrawEnabled) {
      this.send({ command: 'draw_polyline', payload: { value: 'polyline' } });
    } else {
      this.send({ command: 'draw_polyline', payload: { value: 'none' } })
    }
    this.polylineDrawEnabled = !this.polylineDrawEnabled;
  }
}
export default Polylinedrawer;
