import m from 'mithril';
import modal from '../utils/modal.js';

class UploadGeoJsonMap {

  constructor(send) {
    this.showModal = false;
    this.send = send;
  }

  view(vnode) {
    return m("div", [
      this.showModal && m(modal, { content: [
        m("input", { type: "file", onchange: (e)=>{
          this.uploadGeoJsonMap(e.target.files[0], this.send);
        } }),
        m("button", { onclick: ()=>{ this.showModal = !this.showModal } }, "close")
      ]}),
      m("button", { onclick: ()=> { this.triggerModal() } }, "load map")
    ]);
  }

  uploadGeoJsonMap(file, send) {
    file.text().then((data)=>{
      send({ command: "addsupportmap", payload: JSON.parse(data) });
    });
  }

  triggerModal() {
    this.showModal = !this.showModal;
  }
}
export default UploadGeoJsonMap;
