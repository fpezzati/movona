class Ctrlz {

  constructor(queuesize = 10, statusHandler) {
    this.queueMaxSize = queuesize;
    this.queue = [];
    this.state = {};
    this.stateHandler = statusHandler;
  }

  accept(command, state) {
    if(this.queue.length < 1) {
      this.state = state;
    } else if (this.queue.length >= this.queueMaxSize) {
      this.state = this.updateStateAndQueue(this.queue, this.state, this.stateHandler);
    }
    this.queue.push(command);
  }

  updateStateAndQueue(queue, state, handler) {
    let command = queue[0];
    queue.shift();
    if(handler == undefined) {
      return state;
    } else {
      return handler.accept(command, state);
    }
  }
};

export default Ctrlz;
