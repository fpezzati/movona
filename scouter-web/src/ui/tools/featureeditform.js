import m from 'mithril';

class FeatureEditForm {

  constructor(feature) {
    this.display = 'none';
    this.feature = feature;
  }

  view(vnode) {
    return m('div', { class: '.scouter-feature-edit', style: { display: this.display } }, [
        this.buildSubForm(vnode.state.feature.properties, 'nothing'),
        m('button', { onclick: this.saveAndClose }, 'Save')
      ]);
  }

  buildSubForm(obj, objname) {
    if(!obj || !obj.id) return m('.scouter-feature-edit-div');
    return m('.scouter-feature-edit-div', [
      m('label.feature-edit-div', objname),
      m('label.feature-edit', obj.id),
      Object.entries(obj).forEach( property => {
        if(property instanceof Object) {
          return buildSubForm(property, '');
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
    this.display = 'none';
    //send edited stuff
  }

  show(feature) {
    this.display = 'block';
    this.feature = feature;
  }
}

export default FeatureEditForm;
