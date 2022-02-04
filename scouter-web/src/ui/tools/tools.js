import m from 'mithril';
import modal from '../utils/modal.js';

let showModal = false;
let ischecked = false;
var displayMenu = "none";

function loadgeojson (scouter) {
  showModal = !showModal;
}

function toggleToolsButton() {
  displayMenu = ischecked ? "none" : "block";
  ischecked = !ischecked;
}

function uploadGeoJsonMap(file, scouter, state) {
  console.log("file? " + JSON.stringify(file));
  file.text().then((data)=>{
    var newstate = scouter.accept({ command: "addsupportmap", payload: JSON.parse(data) }, state);
    console.log("new state: " + JSON.stringify(newstate));
  });
}

var Tools = (function() {
  return {
    view: function(vnode) {
      return m('.scouter-toolbar', [
        m("label.scouter-tools-main-button", { for: "scouter-toolbar-hidden-checkbox", onclick: toggleToolsButton }, "Tools"),
        m("input", { id: "scouter-toolbar-hidden-checkbox", type: "checkbox" }),
        m("div.scouter-toolbar-menu", { style: { display: displayMenu } },
          m("ul", [
            m("li",
              m("div", [
                showModal && m(modal, { content: [
                  m("input", { type: "file", onchange: function(){
                    uploadGeoJsonMap(this.files[0], vnode.state.scouter, vnode.state.state);
                  } }),
                  m("button", { onclick: ()=>{ showModal = !showModal } }, "close")
                ]}),
                m("button", {
                  onclick: ()=> { loadgeojson(vnode.state.scouter) }
                }, "load map")
              ]
            )
          )
          ])
        )
      ]);
    }
  };
})();

export default Tools;
