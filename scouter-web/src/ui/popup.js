import Overlay from './overlay.js';
var Popup = (function() {

  var eventbus;
  var buttons;

  function closePopup() {

  };

  return {
    oninit: function(vnode) {
        eventbus = vnode.state.eventbus;
        buttons = vnode.state.buttons;
    },

    view: function(vnode) {
      return
        m(Overlay, {},
          m(".popup", [
            m("div", vnode.attrs.category[0]),
            m(".popup_buttons_panel",
              buttons.map(button =>
                m("button", { onclick: button.onclick }, button.text)
              )
            ),
            m("button", { onclick: closePopup }, "close")
          ])
        );
    }
  }
})();
export default Popup;
