import m from 'mithril';

class FeatureEditForm {

  constructor(send) {
    this.fef = m('div', { style: { display: 'none' }});
    this.send = send;
  }

  // this is not that good. Turn back on classic map over data approach.
  view(vnode) {
    return this.fef;
  }

  saveAndClose(feature) {
    this.editHandler.disable();
  }

  cancelAndClose(feature) {
    this.send({ command: 'remove_feature', payload: { id: feature.properties.id } });
    this.editHandler.disable();
  }

  deleteAndClose(feature) {
    this.editHandler.disable();
  }

  show(feature, editHandler) {
    this.feature = feature;
    if(!this.feature || !this.feature.properties) this.fef = m('div', { style: { display: 'none' }});
    this.fef = m('div', [
      this.buildSubForm(this.feature.properties),
      m('button', { onclick: () => this.cancelAndClose(this.feature) }, 'Cancel'),
      m('button', { onclick: () => this.deleteAndClose(this.feature) }, 'Delete'),
      m('button', { onclick: () => this.saveAndClose(this.feature) }, 'Save')
    ]);
    this.editHandler = editHandler;
    m.redraw();
  }

  addAttribute(form) {
    form.push(m('div', [
        m('input[type=text]', { value: 'property name' }),
          m('input[type=text]', { value: 'property value' })
    ]));
  }

  buildSubForm(obj) {
    const form = Object.entries(obj).map( property => (
        m('div', [
          m('label', property[0]),
          (property[1] instanceof Object) ?
            buildSubForm(property[1]) :
            m('input[type=text]', { value: property[1] })
        ])
      ));
// Keep that commented for now because there is no real need of.
//    form.push(
//      m('button', { onclick: () => this.addAttribute(form) }, '+')
//    );
    return form;
  }
}

export default FeatureEditForm;
