import m from 'mithril';

class FeatureEditForm {

  constructor() {
    this.feature = {};
  }

  view(vnode) {
    if(!this.feature || !this.feature.properties) return m('div', { style: { display: 'none' }});
    return m('div', [
      this.buildSubForm(this.feature.properties),
      m('button', { onclick: () => this.cancelAndClose(this.feature) }, 'Cancel'),
      m('button', { onclick: () => this.deleteAndClose(this.feature) }, 'Delete'),
      m('button', { onclick: () => this.saveAndClose(this.feature) }, 'Save')
    ]);
  }

  buildSubForm(obj) {
    return m('div', [
      Object.entries(obj).map( property => (
        m('div', [
          m('label', property[0]),
          (property[1] instanceof Object) ?
            buildSubForm(property[1]) :
            m('input[type=text]', { value: property[1] })
        ])
      )),
      m('button', '+')
    ]);
  }

  saveAndClose(feature) {
    this.editHandler.disable();
  }

  cancelAndClose(feature) {
    this.editHandler.disable();
  }

  deleteAndClose(feature) {
    this.editHandler.disable();
  }

  show(feature, editHandler) {
    this.feature = feature;
    this.editHandler = editHandler;
    m.redraw();
  }
}

export default FeatureEditForm;
