import m from 'mithril';
import modal from '../utils/modal.js';

var showModal = false;

class UploadGeoJsonMap {

  view(vnode) {
    return m("div", [
      showModal && m(modal, { content: [
        m("input", { type: "file", onchange: function() {
          this.uploadGeoJsonMap(this.files[0], vnode.state.send);
        } }),
        m("button", { onclick: ()=>{ showModal = !showModal } }, "close")
      ]}),
      m("button", { onclick: ()=> { this.triggerModal() } }, "load map")
    ]);
  }

  uploadGeoJsonMap(file, send) {
    file.text().then((data)=>{
      send({ command: "addsupportmap", payload: JSON.parse(data) });
    });
  }

  triggerModal(scouter) {
    this.showModal = !this.showModal;
  }
}
export default UploadGeoJsonMap;
