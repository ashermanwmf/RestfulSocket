class RestfulSocket {
  constructor(...params) {
    this._init(...params)
      ._openSocket();
  }

  _init(socketURL, onopen, onclose, onerror) {
    try {
      this.__setRequests__ = {};
      this._setSocketURL = socketURL;
      this._setOnopen = onopen;
      this._setOnclose = onclose;
      this._setOnerror = onerror;
      this._setSocket = new WebSocket(this._getSocketURL, 'echo-protocol');
    } catch(e) {
      console.log(e);
    }

    return this;
  }

  __reset__() {
    delete this._requestURL;
    delete this._requestObject;
    return null;
  }

  __validateType__(type, value, name) {
    if (typeof value !== type || value === null) { 
      throw new Error(`${name} not a/an ${type} or null value`); 
    }

    return null;
  }

  set __setRequests__(storage) {
    this.__requests__ = storage;
    return null;
  }

  set _setSocketURL(socketURL) {
    this.__validateType__('string', socketURL, 'socket');
    this._socketURL = socketURL;
    return null;
  }

  set _setOnopen(onopen) {
    this.__validateType__('function', onopen, 'onopen');
    this._onopen = onopen;
    return null;
  }

  set _setOnclose(onclose) {
    this.__validateType__('function', onclose, 'onclose');
    this._onclose = onclose;
    return null;
  }

  set _setOnerror(onerror) {
    this.__validateType__('function', onerror, 'onerror');
    this._onerror = onerror;
    return null;
  }

  set _setSocket(socket) {
    this._socket = socket;
    return null;
  }

  set _setRequestURL(url) {
    this.__validateType__('string', url, 'request url');
    
    if (Array.isArray(this._requestURL)) {
      this._requestURL.push(url);
    } else {
      this._requestURL = [url];
    }

    return null;
  }

  set _setRequestObject(requestObject) {
    this.__validateType__('object', requestObject, 'request object');

    if (Array.isArray(this._requestObject)) {
      this._requestObjects.push(requestObject);
    } else {
      this._requestObjects = [requestObject];
    }

    return null;
  }

  set _setFindSocketMessage(cb) {
    this.__validateType__('function', cb, 'findSocketMessage');

    this._findSocketMessage = cb;
    return null;
  }

  get _getRequests() {
    return this.__requests__;
  }

  get _getSocketURL() {
    return this._socketURL;
  }

  get _getOnopen() {
    return this._onopen;
  }

  get _getOnclose() {
    return this._onclose;
  }

  get _getOnerror() {
    return this._onerror;
  }

  get _getRequestURLs() {
    return this._requestURL;
  }

  get _getRequestObjects() {
    return this._requestObjects;
  }

  get _getFindSocketMessage() {
    return this._findSocketMessage;
  }

  get socket() {
    return this._socket;
  }

  _generatePromiseAll(message) {
    const request = this._getRequests[message];
    const urls = request.url;
    const requestObjects = request.requestObject;

    try {
      const requests = urls.map((url, index) =>{
        return fetch(url, requestObjects[index]);
      });
      
      return Promise.all(requests);
    } catch(e) {
      throw new Error(e);
    }

    return this;
  }

  _openSocket() {
    try {
      this._socket.onerror = this._getOnerror;
      this._socket.onopen = this._getOnopen;
      this._socket.onclose = this._getOnclose;
    } catch(e) {
      throw new Error(e);
    }
    
    return this;
  }

  _setRequestInformation(url, requestObject) {
    this._setRequestURL = url;
    this._setRequestObject = requestObject;
    return null;
  }

  findSocketMessage(cb) {
    this._setFindSocketMessage = cb;
    return null;
  }

  get(url, requestObject) {
    this._setRequestInformation(url, requestObject);
    return this;
  }

  post(url, requestObject) {
    this._setRequestInformation(url, requestObject);
    return this;
  }

  put(url, requestObject) {
    this._setRequestInformation(url, requestObject);
    return this;
  }

  patch(url, requestObject) {
    this._setRequestInformation(url, requestObject);
    return this;
  }

  delete(url, requestObject) {
    this._setRequestInformation(url, requestObject);
    return this;
  }

  on(message) {
    this._getRequests[message] = {
      url: this._getRequestURLs,
      requestObject: this._getRequestObjects
    }

    this.__reset__();

    return new Promise ((resolve, reject) =>{
      this._socket.onmessage = (event) =>{
        const findSocketMessage = this._getFindSocketMessage;
        const serverMessage = findSocketMessage(event);
        
        resolve(this._generatePromiseAll(serverMessage));
      };
    });
  }
  
}

module.exports = RestfulSocket;
