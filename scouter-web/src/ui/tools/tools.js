import m from 'mithril';

class Tools {

  constructor(componentTools) {
    this.componentTools = componentTools;
    this.ischecked = false;
    this.displayMenu = "none";
    this.toggleToolsButton = this.toggleToolsButton.bind(this);
  }

  toggleToolsButton() {
    this.displayMenu = !this.ischecked ? "block" : "none";
    this.ischecked = !this.ischecked;
  }

  view(vnode) {
    return m('.scouter-toolbar', [
        m("label.scouter-tools-main-button", { for: "scouter-toolbar-hidden-checkbox", onclick: this.toggleToolsButton }, "Tools"),
        m("input", { id: "scouter-toolbar-hidden-checkbox", type: "checkbox" }),
        m("div.scouter-toolbar-menu", { style: { display: this.displayMenu } },
          m("ul", [ this.componentTools.map(item => m("li", m(item))) ])
        )
      ]);
  }
}

export default Tools;
