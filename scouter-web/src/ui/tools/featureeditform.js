import m from 'mithril';

class FeatureEditForm {

  constructor() {
    this.feature = {};
  }

  view(vnode) {
    if(!this.feature || !this.feature.properties) return m('div', { style: { display: 'none' }});
    return m('div', { class: '.scouter-feature-edit', style: { display: 'block' } }, [
//        this.buildSubForm(this.feature.properties, 'nothing'),
        m('label', 'start name'),
        m('input[type=text]', { value: this.feature.properties.start_name}),
        m('label', 'end name'),
        m('input[type=text]', { value: this.feature.properties.end_name}),
        m('button', { onclick: () => this.cancelAndClose(this.feature) }, 'Cancel'),
        m('button', { onclick: () => this.deleteAndClose(this.feature) }, 'Delete'),
        m('button', { onclick: () => this.saveAndClose(this.feature) }, 'Save')
      ]);
  }

  buildSubForm(obj, objname) {
    if(!obj || !obj.id) return m('.scouter-feature-edit-div');
    return m('.scouter-feature-edit-div', [
      m('label.feature-edit-div', objname),
      m('label.feature-edit', obj.id),
      Object.entries(obj).forEach( property => {
        if(property instanceof Object) {
          return this.buildSubForm(property, '');
        } else{
          m('div'[
//            m('label', { for: 'feature-input-' + property })
            m('span', property)
          ])
        }
      })
    ]);
  }

  saveAndClose(feature) {
    feature.target.editing.disable();
  }

  cancelAndClose(feature) {
    this.editHandler.disable();
  }

  deleteAndClose(feature) {
    feature.target.editing.disable();
  }

  show(feature, editHandler) {
    this.feature = feature;
    this.editHandler = editHandler;
    m.redraw();
  }
}

export default FeatureEditForm;
