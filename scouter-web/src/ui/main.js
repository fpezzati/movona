import m from 'mithril';

class Main {

  constructor(tools) {
    this.tools = tools;
    this.state = {};
    this.gui = {};
  }

  oninit(vnode) {
      this.state = vnode.state.state;
      this.gui = vnode.state.gui;
      this.tools.scouter = vnode.state.scouter;
      this.tools.state = vnode.state.state;
      this.tools.send = this.send;
  }

  view(vnode) {
    return m("div",[
      m(this.tools)
    ], "Scouter, the path driver!")
  }
}
export default Main;
