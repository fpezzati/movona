class Eventbus {

  constructor(defaultHandler = {
    command: "default",
    behave: function(msg, state) {
      console.log("Not aware of: " + JSON.stringify(msg));
      return state;
    }
  }) {
    this.handlers = new Map();
    this.handlers.set(defaultHandler.command, defaultHandler.behave);
  }

  accept(message, state) {
    try {
      var copyedState = JSON.parse(JSON.stringify(state));
      var copyedMessage = JSON.parse(JSON.stringify(message));
      if(typeof this.handlers.get(message.command) === 'undefined') {
        return this.handlers.get('default').call(this, copyedMessage, copyedState);
      }
      return this.handlers.get(message.command)['behave'](copyedMessage, copyedState);
    } catch (error) {
      return JSON.parse(JSON.stringify(copyedState));
    }
  }
};

export default Eventbus;
