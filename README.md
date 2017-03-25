# Welcome to RestfulSocket

RestfulSocket is a RESTful Socket that combines the native Fetch, Websocket and Promise API to create a 
restful response to a websocket event listener.


# Getting Started

1. Install RestfulSocket:

```
npm install -save RestfulSocket
```

2. Import RestfulSocket: 

```
import RestfulSocket from 'restfulSocket'
```

3. Use RestfulSocket:

```
const restSocket = new RestfulSocket('ws://localhost/', onopen, onclose, onerror);

RestSocket.get('localhost/api/initialData')
  .on('sampleMessage')
  .then((data) => {
    //DATA is an array of objects returned from fetch promises
  })
  .catch(console.log);
```

4. Complex use case:

```
const RestSocket = new RestfulSocket('ws://localhost/', onopen, onclose, onerror);

RestSocket.get('localhost/api/initialData')
  .post('localhost/api/initialPost', requestObject)
  .on('init')
  .then((data) => {
    //DATA is an array of objects returned from fetch promises
  })
  .catch(console.log);

RestSocket.get('localhost/api/updateData')
  .get('localhost/api/secondaryData', requestObject)
  .on('update')
  .then((data) => {
    //DATA is an array of objects returned from fetch promises
  })
  .catch(console.log);
```
