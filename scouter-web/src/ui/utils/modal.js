import m from 'mithril';

/*
A simple gui component, it creates an overlay and displays on top what is in 'content' attribute.
*/
var modal = (function(){
  return {
    view: function(vnode) {
      return m(".modal",
        m(".modal-content", [ vnode.attrs.content ])
      )
    }
  }
})();

export default modal;
