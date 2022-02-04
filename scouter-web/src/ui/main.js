import m from 'mithril';
import Tools from './tools/tools.js';
var main = (function(){

  var inputNpt;
  var state = {};
  var gui = {};

  function sendCustomEvent() {
    window.dispatchEvent(new CustomEvent('milkroute', {
      detail: inputNpt
    }));
  };

  return {
    oninit: function(vnode) {
        state = vnode.state.state;
        gui = vnode.state.gui;
        Tools.scouter = vnode.state.scouter;
        Tools.state = vnode.state.state;
    },

    view: function(vnode) {
      return m("div",[
        m("input", { id: "sendnpt", onchange: e => { inputNpt = e.target.value }}, "message"),
        m("button", { id: "sendbtn", onclick: sendCustomEvent }, "Send"),
        m(Tools)
      ], "Scouter, the path driver!")
    }
  }
})();
export default main;
