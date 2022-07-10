/*
What this on should be about? Well, it collects some validation utilities to share among features components.
Not sure this will be of any use...
*/
const validatePayloadId = (payload) => {
  if(!payload.id) {
    let e = new TypeError('no id specified into message.');
    throw e;
  }
}

const validatePayload = (payload) => {
  validatePayloadId(payload);
}

export { validatePayload, validatePayloadId };
