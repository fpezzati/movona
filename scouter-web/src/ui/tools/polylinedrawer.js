import L from 'leaflet';
import m from 'mithril';

var Polylinedrawer = (function(){
  return {
    oninit: function(vnode) {
        /*
        this.polyDrawer = new L.Draw.Polyline(vnode.map, {

        });
        this.polyDrawer.enable();
        */
    },

    view: function(vnode) {
      return m('button', { onclick: this.drawRoute(vnode) }, 'draw route');
    },

    drawRoute: function(vnode) {
      console.log('drawRoute');
    }
  }
})();
export default Polylinedrawer;
